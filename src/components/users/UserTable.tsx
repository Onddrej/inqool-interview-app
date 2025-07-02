// UserTable.tsx
// Table component for displaying, filtering, sorting, editing, banning, and deleting users.

import { useState, useEffect } from 'react';
import { IconSearch, IconEdit, IconBan, IconCheck } from '@tabler/icons-react';
import {
  Group,
  ScrollArea,
  Table,
  Text,
  TextInput,
  Badge,
  Button,
  Modal,
} from '@mantine/core';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchUsers, banUser, unbanUser } from '../../api/users';
import type { RowData } from '../../api/users';
import { UserForm } from './UserForm';
import { SortableTh } from '../shared/SortableTh';
import { sortData } from '../shared/tableUtils';
import { TableSkeleton } from '../shared/TableSkeleton';
import { USER_COLOR } from '../../style/colors';

/**
 * Props for UserTable
 * @param onUserAdded Callback fired when a user is added, edited, banned, unbanned, or deleted.
 */
export function UserTable({ onUserAdded }: { onUserAdded?: (type?: 'added' | 'edited' | 'banned' | 'deleted' | 'unbanned') => void }) {
  // Fetch users from API
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })

  // State for search, sorting, and modals
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState<RowData[]>([]);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [editUser, setEditUser] = useState<RowData | null>(null);
  const [banLoadingId, setBanLoadingId] = useState<string | null>(null);
  const queryClient = useQueryClient();

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

  // Ban/unban logic
  const handleBanToggle = async (userId: string, banned: boolean) => {
    setBanLoadingId(userId);
    try {
      if (banned) {
        await unbanUser(userId);
        if (onUserAdded) onUserAdded('unbanned');
      } else {
        await banUser(userId);
        if (onUserAdded) onUserAdded('banned');
      }
      await queryClient.invalidateQueries({ queryKey: ['users'] });
      await queryClient.refetchQueries({ queryKey: ['users'] });
    } finally {
      setBanLoadingId(null);
    }
  };

  // Render table rows
  const rows = sortedData.map((row) => (
    <Table.Tr key={row.id}>
      <Table.Td>{row.id}</Table.Td>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.gender}</Table.Td>
      <Table.Td>
        {row.banned ? <Badge color="red">Banned</Badge> : <Badge color="green">Active</Badge>}
      </Table.Td>
      <Table.Td>
        <Group gap="xs" justify="start">
          <Button size="xs" variant="subtle" color={USER_COLOR} leftSection={<IconEdit size={16} />} onClick={() => setEditUser(row)}>
            Edit
          </Button>
          <Button
            size="xs"
            variant="subtle"
            color={row.banned ? USER_COLOR : 'red'}
            leftSection={row.banned ? <IconCheck size={16} /> : <IconBan size={16} />}
            onClick={() => handleBanToggle(row.id, row.banned)}
            loading={banLoadingId === row.id}
          >
            {row.banned ? 'Unban' : 'Ban'}
          </Button>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  // Loading and error states
  if (isLoading) return (
    <ScrollArea>
      <TableSkeleton columns={['ID', 'Name', 'Gender', 'Banned']} rows={5} />
    </ScrollArea>
  );
  if (error) return <div>Error loading data</div>

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
          color={USER_COLOR}
          onClick={() => {
            setSearch('');
            setSortBy(null);
            setReverseSortDirection(false);
            setSortedData(data ?? []);
          }}
        >
          Clear all filters
        </Button>
        <Button onClick={() => setAddUserOpen(true)} color={USER_COLOR}>
          Add user
        </Button>
      </Group>
      {/* Add user modal */}
      <Modal opened={addUserOpen} onClose={() => setAddUserOpen(false)} title="Add User" centered>
        <UserForm onCancel={() => setAddUserOpen(false)} onSuccess={() => {
          setAddUserOpen(false);
          if (onUserAdded) onUserAdded('added');
        }} />
      </Modal>
      {/* Edit user modal */}
      <Modal opened={!!editUser} onClose={() => setEditUser(null)} title="Edit User" centered>
        {editUser && (
          <UserForm user={editUser} onCancel={() => setEditUser(null)} onSuccess={(_success, action) => {
            setEditUser(null);
            if (onUserAdded) onUserAdded(action === 'deleted' ? 'deleted' : 'edited');
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
              sorted={sortBy === 'gender'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('gender')}
            >
              Gender
            </SortableTh>
            <SortableTh
              sorted={sortBy === 'banned'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('banned')}
            >
              Banned
            </SortableTh>
            <Table.Th>Actions</Table.Th>
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