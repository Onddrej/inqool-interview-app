import { Card, TextInput, Button, Select, Text, Stack, Flex } from '@mantine/core';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { RowData } from '../api/users';
import { createUser, updateUser } from '../api/users';

const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  gender: z.enum(['female', 'male', 'other']),
  banned: z.literal(false),
});

type UserFormValues = z.infer<typeof userSchema>;

export function UserForm({ onCancel, onSuccess, user }: { onCancel?: () => void; onSuccess?: (success?: boolean) => void; user?: RowData }) {
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
    defaultValues: user ? { name: user.name, gender: user.gender, banned: false } : { gender: 'male', banned: false },
  });

  const mutation = useMutation({
    mutationFn: (data: UserFormValues) =>
      isEdit && user ? updateUser(user.id, { ...data, banned: user.banned }) : createUser({ ...data, banned: false }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      reset();
      if (onSuccess) onSuccess(true);
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
          <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
            Save
          </Button>
        </Flex>
        {mutation.isError && <Text c="red" mt="sm">Error adding user</Text>}
      </form>
    </Card>
  );
} 