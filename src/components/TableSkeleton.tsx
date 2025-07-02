import { Table, Skeleton } from '@mantine/core';
import React from 'react';

interface TableSkeletonProps {
  columns: (string | React.ReactNode)[];
  rows?: number;
}

export function TableSkeleton({ columns, rows = 5 }: TableSkeletonProps) {
  return (
    <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
      <Table.Tbody>
        <Table.Tr>
          {columns.map((col, i) => (
            <Table.Th key={i}>{col}</Table.Th>
          ))}
        </Table.Tr>
      </Table.Tbody>
      <Table.Tbody>
        {Array.from({ length: rows }).map((_, i) => (
          <Table.Tr key={i}>
            {columns.map((_, j) => (
              <Table.Td key={j}>
                <Skeleton height={16} width={j === 0 ? 30 : j === 1 ? '80%' : 60} radius="xl" />
              </Table.Td>
            ))}
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
} 