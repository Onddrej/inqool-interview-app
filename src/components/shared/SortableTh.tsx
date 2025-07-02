// SortableTh.tsx
// Table header cell component for sortable columns.

import { Table, UnstyledButton, Group, Text, Center } from '@mantine/core';
import { IconChevronDown, IconChevronUp, IconSelector } from '@tabler/icons-react';
import classes from './TableSort.module.css';
import React from 'react';

/**
 * Props for SortableTh
 * @param children Column label
 * @param reversed Whether the sort direction is reversed
 * @param sorted Whether this column is currently sorted
 * @param onSort Callback to trigger sorting
 */
export interface SortableThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort: () => void;
}

/**
 * SortableTh component
 * Renders a table header cell with a sort icon and click handler.
 */
export function SortableTh({ children, reversed, sorted, onSort }: SortableThProps) {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={16} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
} 