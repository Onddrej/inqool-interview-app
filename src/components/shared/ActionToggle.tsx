import { IconMoon, IconSun } from '@tabler/icons-react';
import { ActionIcon, Group, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';

export function ActionToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <Group justify="center">
      <ActionIcon
        onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
        variant="default"
        size="xl"
        radius="md"
        aria-label="Toggle color scheme"
      >
        {computedColorScheme === 'light' ? (
          <IconSun stroke={1.5} />
        ) : (
          <IconMoon stroke={1.5} />
        )}
      </ActionIcon>
    </Group>
  );
} 