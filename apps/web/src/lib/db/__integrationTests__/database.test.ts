import '@tests/integration-tests';

describe('Database Integration Tests', () => {
  beforeEach(async () => {
    await global.testPrisma.user.deleteMany();
  });

  it('creates and retrieves a User', async () => {
    const userData = {
      email: 'test@example.com',
      name: 'Test User',
    };

    const createdUser = await global.testPrisma.user.create({
      data: userData,
    });

    expect(createdUser.id).toBeTruthy();
    expect(createdUser.email).toBe(userData.email);
    expect(createdUser.name).toBe(userData.name);

    const retrievedUser = await global.testPrisma.user.findUnique({
      where: { email: userData.email },
    });

    expect(retrievedUser).not.toBeNull();
    expect(retrievedUser?.id).toBe(createdUser.id);
    expect(retrievedUser?.email).toBe(createdUser.email);
    expect(retrievedUser?.name).toBe(createdUser.name);
  });

  it('handles unique email constraint', async () => {
    const userData = {
      email: 'duplicate@example.com',
      name: 'Test User',
    };

    await global.testPrisma.user.create({ data: userData });

    await expect(
      global.testPrisma.user.create({
        data: {
          email: 'duplicate@example.com',
          name: 'Another User',
        },
      })
    ).rejects.toThrow();
  });
});
