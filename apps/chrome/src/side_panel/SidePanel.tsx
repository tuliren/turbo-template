import {
  Anchor,
  Button,
  Code,
  Container,
  Group,
  Stack,
  Tabs,
  Text,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core';
import '@mantine/core/styles.css';
import { FC, useState } from 'react';

import LoadingPanel from '../common/LoadingPanel';
import { GlobalConfig } from '../common/globalConfig';
import { useTabs } from '../contexts/TabsContext';
import { UserProfileProvider, useUserProfile } from '../contexts/UserProfileContext';
import { useHtmlParser } from '../hooks/useHtmlParser';

const MainTab: FC = () => {
  const { currentTab } = useTabs();
  const { parsing, getMarkdown } = useHtmlParser();
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleExtract = async () => {
    if (!currentTab?.id) {
      setError('No active tab');
      return;
    }
    setError(null);
    try {
      setContent(await getMarkdown(currentTab.id));
    } catch (e) {
      setError(String(e));
    }
  };

  return (
    <Stack gap="sm" mt="sm">
      <Text size="sm" c="dimmed">
        Round-trip the active page through the content script and render the Turndown-converted
        markdown below.
      </Text>
      <Button onClick={handleExtract} loading={parsing} disabled={!currentTab?.id}>
        Extract page markdown
      </Button>
      {error && (
        <Text size="sm" c="red">
          {error}
        </Text>
      )}
      <Textarea
        value={content}
        readOnly
        autosize
        minRows={8}
        maxRows={20}
        placeholder="Markdown will appear here."
      />
    </Stack>
  );
};

const ProfileTab: FC = () => {
  const { profile, loading, saveProfile, clearProfile } = useUserProfile();
  const [displayName, setDisplayName] = useState(profile.displayName);
  const [email, setEmail] = useState(profile.email);
  const [saving, setSaving] = useState(false);

  if (loading) {
    return <LoadingPanel />;
  }

  const dirty = displayName !== profile.displayName || email !== profile.email;

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveProfile({ displayName, email });
    } finally {
      setSaving(false);
    }
  };

  const handleClear = async () => {
    await clearProfile();
    setDisplayName('');
    setEmail('');
  };

  return (
    <Stack gap="sm" mt="sm">
      <Text size="sm" c="dimmed">
        Stored locally in <Code>chrome.storage.local</Code>. No network calls.
      </Text>
      <TextInput
        label="Display name"
        value={displayName}
        onChange={(e) => setDisplayName(e.currentTarget.value)}
        placeholder="Ada Lovelace"
      />
      <TextInput
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
        placeholder="ada@example.com"
      />
      <Group gap="sm">
        <Button onClick={handleSave} loading={saving} disabled={!dirty}>
          Save
        </Button>
        <Button variant="light" color="red" onClick={handleClear}>
          Clear
        </Button>
      </Group>
    </Stack>
  );
};

const AboutTab: FC = () => {
  return (
    <Stack gap="sm" mt="sm">
      <Text>
        <strong>Chrome Extension Template</strong>
      </Text>
      <Text size="sm" c="dimmed">
        Version {GlobalConfig.version} ({GlobalConfig.environment})
      </Text>
      <Anchor component="button" type="button" onClick={() => chrome.runtime.openOptionsPage()}>
        Open options
      </Anchor>
    </Stack>
  );
};

const SidePanel: FC = () => {
  return (
    <UserProfileProvider>
      <Container fluid p="sm">
        <Title order={4} mb="sm">
          Chrome Extension Template
        </Title>
        <Tabs defaultValue="main">
          <Tabs.List>
            <Tabs.Tab value="main">Main</Tabs.Tab>
            <Tabs.Tab value="profile">Profile</Tabs.Tab>
            <Tabs.Tab value="about">About</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="main">
            <MainTab />
          </Tabs.Panel>
          <Tabs.Panel value="profile">
            <ProfileTab />
          </Tabs.Panel>
          <Tabs.Panel value="about">
            <AboutTab />
          </Tabs.Panel>
        </Tabs>
      </Container>
    </UserProfileProvider>
  );
};

export default SidePanel;
