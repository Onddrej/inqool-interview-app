// AnimalTable.tsx
// Table component for displaying, filtering, sorting, and editing animals.

import { useState, useEffect } from 'react';
import { IconSearch, IconEdit } from '@tabler/icons-react';
import {
  Group,
  ScrollArea,
  Table,
  Text,
  TextInput,
  Button,
  Modal,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { fetchAnimals } from '../../api/animals';
import type { RowData } from '../../api/animals';
import { AnimalForm } from './AnimalForm';
import { SortableTh } from '../shared/SortableTh';
import { sortData } from '../shared/tableUtils';
import { TableSkeleton } from '../shared/TableSkeleton';
import { ANIMAL_COLOR } from '../../style/colors';

/**
 * Props for AnimalTable
 * @param onAnimalChanged Callback fired when an animal is added, edited, or deleted.
 */
export function AnimalTable({ onAnimalChanged }: { onAnimalChanged?: (type?: 'added' | 'edited' | 'deleted') => void }) {
  // Fetch animals from API
  const { data, isLoading, error } = useQuery({
    queryKey: ['animals'],
    queryFn: fetchAnimals,
  });

  // State for search, sorting, and modals
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState<RowData[]>([]);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [addAnimalOpen, setAddAnimalOpen] = useState(false);
  const [editAnimal, setEditAnimal] = useState<RowData | null>(null);

  // Update sorted data when API data changes
  useEffect(() => {
    if (data) {
      setSortedData(data);
    }
  }, [data]);

  // Sorting logic
  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  // Search logic
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  // Render table rows
  const rows = sortedData.map((row) => (
    <Table.Tr key={row.id}>
      <Table.Td>{row.id}</Table.Td>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.type}</Table.Td>
      <Table.Td>{row.age}</Table.Td>
      <Table.Td>
        <Button size="xs" variant="subtle" color={ANIMAL_COLOR} leftSection={<IconEdit size={16} />} onClick={() => setEditAnimal(row)}>
          Edit
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  // Loading and error states
  if (isLoading) return (
    <ScrollArea>
      <TableSkeleton columns={['ID', 'Name', 'Type', 'Age']} rows={5} />
    </ScrollArea>
  );
  if (error) return <div>Error loading data</div>;

  // Main render
  return (
    <ScrollArea>
      {/* Filter and action buttons */}
      <Group mb="md">
        <TextInput
          placeholder="Search by any field"
          leftSection={<IconSearch size={16} stroke={1.5} />}
          value={search}
          onChange={handleSearchChange}
        />
        <Button
          variant="outline"
          color={ANIMAL_COLOR}
          onClick={() => {
            setSearch('');
            setSortBy(null);
            setReverseSortDirection(false);
            setSortedData(data ?? []);
          }}
        >
          Clear all filters
        </Button>
        <Button onClick={() => setAddAnimalOpen(true)} color={ANIMAL_COLOR}>
          Add animal
        </Button>
      </Group>
      {/* Add animal modal */}
      <Modal opened={addAnimalOpen} onClose={() => setAddAnimalOpen(false)} title="Add Animal" centered>
        <AnimalForm onCancel={() => setAddAnimalOpen(false)} onSuccess={(_success, action) => {
          setAddAnimalOpen(false);
          if (onAnimalChanged) onAnimalChanged(action as 'added');
        }} />
      </Modal>
      {/* Edit animal modal */}
      <Modal opened={!!editAnimal} onClose={() => setEditAnimal(null)} title="Edit Animal" centered>
        {editAnimal && (
          <AnimalForm animal={editAnimal} onCancel={() => setEditAnimal(null)} onSuccess={(_success, action) => {
            setEditAnimal(null);
            if (onAnimalChanged) onAnimalChanged(action as 'edited' | 'deleted');
          }} />
        )}
      </Modal>
      {/* Table with sortable headers */}
      <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
        <Table.Tbody>
          <Table.Tr>
            <SortableTh
              sorted={sortBy === 'id'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('id')}
            >
              ID
            </SortableTh>
            <SortableTh
              sorted={sortBy === 'name'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('name')}
            >
              Name
            </SortableTh>
            <SortableTh
              sorted={sortBy === 'type'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('type')}
            >
              Type
            </SortableTh>
            <SortableTh
              sorted={sortBy === 'age'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('age')}
            >
              Age
            </SortableTh>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Tbody>
        <Table.Tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={5}>
                <Text fw={500} ta="center">
                  Nothing found
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
} 