import { Card, TextInput, Button, Select, Text, Stack, Flex } from '@mantine/core';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { RowData } from '../api/users';
import { createUser, updateUser, deleteUser } from '../api/users';
import { USER_COLOR } from '../style/colors';

const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  gender: z.enum(['female', 'male', 'other']),
  banned: z.boolean(),
});

type UserFormValues = z.infer<typeof userSchema>;

export function UserForm({ onCancel, onSuccess, user }: { onCancel?: () => void; onSuccess?: (success?: boolean, action?: string) => void; user?: RowData }) {
  const queryClient = useQueryClient();
  const isEdit = !!user;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    control,
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: user ? { name: user.name, gender: user.gender, banned: user.banned } : { gender: 'male', banned: false },
  });

  const mutation = useMutation({
    mutationFn: (data: UserFormValues) =>
      isEdit && user ? updateUser(user.id, data) : createUser({ ...data, banned: false }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      reset();
      if (onSuccess) onSuccess(true);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => user ? deleteUser(user.id) : Promise.resolve(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      if (onSuccess) onSuccess(true, 'deleted');
    },
  });

  const onSubmit = (data: UserFormValues) => {
    mutation.mutate(data);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <TextInput
            label="Name"
            placeholder="Enter name"
            {...register('name')}
            error={errors.name?.message}
            required
          />
          <Controller
            name="gender"
            control={control}
            render={({ field, fieldState }) => (
              <Select
                label="Gender"
                data={[
                  { value: 'male', label: 'Male' },
                  { value: 'female', label: 'Female' },
                  { value: 'other', label: 'Other' },
                ]}
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
                required
              />
            )}
          />
        </Stack>
        <Flex mt="lg" justify="flex-end" gap="sm">
          <Button variant="default" onClick={onCancel} type="button">
            Cancel
          </Button>
          {isEdit && (
            <Button color="red" variant="filled" onClick={() => deleteMutation.mutate()} loading={deleteMutation.isPending} disabled={deleteMutation.isPending || isSubmitting} type="button">
              Delete
            </Button>
          )}
          <Button type="submit" loading={mutation.isPending} disabled={mutation.isPending} color={USER_COLOR}>
            Save
          </Button>
        </Flex>
        {mutation.isError && <Text c="red" mt="sm">Error saving user</Text>}
        {deleteMutation.isError && <Text c="red" mt="sm">Error deleting user</Text>}
      </form>
    </Card>
  );
} 