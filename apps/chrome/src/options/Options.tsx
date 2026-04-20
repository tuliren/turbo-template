import { Button, Group, Stack, Switch, Text, Title } from '@mantine/core';
import { FC } from 'react';

import LoadingPanel from '../common/LoadingPanel';
import { useOptions } from '../contexts/OptionsContext';

const Options: FC = () => {
  const { options, loadingOptions, savingOptions, updateOptions } = useOptions();

  if (loadingOptions) {
    return <LoadingPanel />;
  }

  return (
    <Stack gap="md" mt="sm">
      <Title order={3}>Extension Options</Title>
      <Text size="sm" c="dimmed">
        Persisted to <code>chrome.storage.sync</code> under key <code>extension_options</code>.
      </Text>
      <Switch
        label="Enable notifications"
        checked={options.enableNotifications}
        onChange={(event) => updateOptions({ enableNotifications: event.currentTarget.checked })}
      />
      <Group gap="sm">
        <Button
          size="compact-sm"
          maw={150}
          loading={savingOptions}
          onClick={() => updateOptions(options)}
        >
          Save
        </Button>
      </Group>
    </Stack>
  );
};

export default Options;
