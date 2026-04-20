import { FC, ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';

export interface UserProfile {
  displayName: string;
  email: string;
}

export const DefaultUserProfile: UserProfile = {
  displayName: '',
  email: '',
};

export const UserProfileStorageKey = 'user_profile';

interface UserProfileContextType {
  profile: UserProfile;
  loading: boolean;
  saveProfile: (next: UserProfile) => Promise<void>;
  clearProfile: () => Promise<void>;
}

const UserProfileContext = createContext<UserProfileContextType>({
  profile: DefaultUserProfile,
  loading: true,
  saveProfile: async () => {},
  clearProfile: async () => {},
});

export const useUserProfile = () => useContext(UserProfileContext);

const readProfile = async (): Promise<UserProfile> => {
  if (chrome.storage == null) {
    return DefaultUserProfile;
  }
  const result = await chrome.storage.local.get(UserProfileStorageKey);
  const stored = result[UserProfileStorageKey] as UserProfile | undefined;
  return stored ?? DefaultUserProfile;
};

const writeProfile = async (profile: UserProfile): Promise<void> => {
  if (chrome.storage == null) {
    return;
  }
  await chrome.storage.local.set({ [UserProfileStorageKey]: profile });
};

export const UserProfileProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(DefaultUserProfile);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setProfile(await readProfile());
      setLoading(false);
    })();
  }, []);

  const saveProfile = useCallback(async (next: UserProfile) => {
    await writeProfile(next);
    setProfile(next);
  }, []);

  const clearProfile = useCallback(async () => {
    await writeProfile(DefaultUserProfile);
    setProfile(DefaultUserProfile);
  }, []);

  return (
    <UserProfileContext.Provider value={{ profile, loading, saveProfile, clearProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};
