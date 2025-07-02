import { useState, useEffect } from 'react';
import { , IconEdit } from '@tabler/icons-react';
import {
  Center,
  Group,
  keys,
  ScrollArea,
  Table,
  Text,
  TextInput,
  UnstyledButton,
  Button,
  Skeleton,
  Modal,
} from '@mantine/core';
import classes from './TableSort.module.css';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchAnimals } from '../api/animals';
import type { RowData } from '../api/animals';
import { AnimalForm } from './AnimalForm';
import { SortableTh } from './SortableTh';
import { filterData, sortData } from './tableUtils';
import { TableSkeleton } from './TableSkeleton';

export function AnimalTable({ onAnimalChanged }: { onAnimalChanged?: () => void }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['animals'],
    queryFn: fetchAnimals,
  });

  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState<RowData[]>([]);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [addAnimalOpen, setAddAnimalOpen] = useState(false);
  const [editAnimal, setEditAnimal] = useState<RowData | null>(null);

  useEffect(() => {
    if (data) {
      setSortedData(data);
    }
  }, [data]);

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  const rows = sortedData.map((row) => (
    <Table.Tr key={row.id}>
      <Table.Td>{row.id}</Table.Td>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.type}</Table.Td>
      <Table.Td>{row.age}</Table.Td>
      <Table.Td>
        <Button size="xs" variant="subtle" leftSection={<IconEdit size={16} />} onClick={() => setEditAnimal(row)}>
          Edit
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  if (isLoading) return (
    <ScrollArea>
      <TableSkeleton columns={['ID', 'Name', 'Type', 'Age']} rows={5} />
    </ScrollArea>
  );
  if (error) return <div>Chyba pri načítaní dát</div>;

  return (
    <ScrollArea>
      <Group mb="md">
        <TextInput
          placeholder="Search by any field"
          leftSection={<IconSearch size={16} stroke={1.5} />}
          value={search}
          onChange={handleSearchChange}
        />
        <Button
          variant="outline"
          onClick={() => {
            setSearch('');
            setSortBy(null);
            setReverseSortDirection(false);
            setSortedData(data ?? []);
          }}
        >
          Clear all filters
        </Button>
        <Button onClick={() => setAddAnimalOpen(true)}>
          Add animal
        </Button>
      </Group>
      <Modal opened={addAnimalOpen} onClose={() => setAddAnimalOpen(false)} title="Add Animal" centered>
        <AnimalForm onCancel={() => setAddAnimalOpen(false)} onSuccess={() => {
          setAddAnimalOpen(false);
          if (onAnimalChanged) onAnimalChanged();
        }} />
      </Modal>
      <Modal opened={!!editAnimal} onClose={() => setEditAnimal(null)} title="Edit Animal" centered>
        {editAnimal && (
          <AnimalForm animal={editAnimal} onCancel={() => setEditAnimal(null)} onSuccess={() => {
            setEditAnimal(null);
            if (onAnimalChanged) onAnimalChanged();
          }} />
        )}
      </Modal>
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