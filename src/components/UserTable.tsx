import { useState, useEffect } from 'react';
import { IconChevronDown, IconChevronUp, IconSearch, IconSelector } from '@tabler/icons-react';
import {
  Center,
  Group,
  keys,
  ScrollArea,
  Table,
  Text,
  TextInput,
  UnstyledButton,
  Badge,
  Button,
  Skeleton,
} from '@mantine/core';
import classes from './TableSort.module.css';
import { useQuery } from '@tanstack/react-query'
import { fetchUsers } from '../api/users';
import type { RowData } from '../api/users';

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort: () => void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
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

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[1]).some((key) => item[key]?.toString().toLowerCase().includes(query))
  );
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy]?.toString().localeCompare(a[sortBy]?.toString());
      }

      return a[sortBy]?.toString().localeCompare(b[sortBy]?.toString());
    }),
    payload.search
  );
}


export function UserTable() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
      })
    
     

  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState<RowData[]>([]);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

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
      <Table.Td>{row.gender}</Table.Td>
      <Table.Td>
        {row.banned ? <Badge color="red">Banned</Badge> : <Badge color="green">Active</Badge>}
      </Table.Td>
    </Table.Tr>
  ));


  if (isLoading) return (
    <ScrollArea>
      <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
        <Table.Tbody>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Gender</Table.Th>
            <Table.Th>Banned</Table.Th>
          </Table.Tr>
        </Table.Tbody>
        <Table.Tbody>
          {[...Array(5)].map((_, i) => (
            <Table.Tr key={i}>
              <Table.Td><Skeleton height={16} width={30} radius="xl" /></Table.Td>
              <Table.Td><Skeleton height={16} width="80%" radius="xl" /></Table.Td>
              <Table.Td><Skeleton height={16} width={60} radius="xl" /></Table.Td>
              <Table.Td><Skeleton height={24} width={60} radius="xl" /></Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
  if (error) return <div>Chyba pri načítaní dát</div>

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
      </Group>
      <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
        <Table.Tbody>
          <Table.Tr>
            <Th
              sorted={sortBy === 'id'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('id')}
            >
              ID
            </Th>
            <Th
              sorted={sortBy === 'name'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('name')}
            >
              Name
            </Th>
            <Th
              sorted={sortBy === 'gender'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('gender')}
            >
              Gender
            </Th>
            <Th
              sorted={sortBy === 'banned'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('banned')}
            >
              Banned
            </Th>
          </Table.Tr>
        </Table.Tbody>
        <Table.Tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={4}>
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