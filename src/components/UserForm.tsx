import { Card, TextInput, Button, Select, Group, Text, Alert } from '@mantine/core';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser } from '../api/users';
import { useState } from 'react';
import { IconCheck } from '@tabler/icons-react';

const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  gender: z.enum(['female', 'male', 'other']),
  banned: z.literal(false),
});

type UserFormValues = z.infer<typeof userSchema>;

export function UserForm() {
  const queryClient = useQueryClient();
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    control,
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: { gender: 'male', banned: false },
  });

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 2000);
    },
  });

  const onSubmit = (data: UserFormValues) => {
    mutation.mutate({ ...data, banned: false });
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Group gap="md" align="flex-end">
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
          <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
            Add User
          </Button>
        </Group>
        {success && (
          <div style={{ position: 'fixed', right: 24, bottom: 24, zIndex: 9999, minWidth: 300 }}>
            <Alert
              variant="light"
              color="green"
              radius="lg"
              title="User created"
              icon={<IconCheck />}
              withCloseButton
              onClose={() => setSuccess(false)}
            >
              The user was successfully added.
            </Alert>
          </div>
        )}
        {mutation.isError && <Text c="red" mt="sm">Error adding user</Text>}
      </form>
    </Card>
  );
} 