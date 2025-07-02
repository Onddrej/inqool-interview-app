import { Card, TextInput, Button, Select, NumberInput, Stack, Flex, Text } from '@mantine/core';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { RowData } from '../../api/animals';
import { createAnimal, updateAnimal, deleteAnimal } from '../../api/animals';
import { ANIMAL_COLOR } from '../../style/colors';


const animalSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.enum(['cat', 'dog', 'other']),
  age: z.number().min(0, 'Age must be non-negative'),
});

type AnimalFormValues = z.infer<typeof animalSchema>;

export function AnimalForm({ onCancel, onSuccess, animal }: { onCancel?: () => void; onSuccess?: (success?: boolean, action?: string) => void; animal?: RowData }) {
  const queryClient = useQueryClient();
  const isEdit = !!animal;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    control,
  } = useForm<AnimalFormValues>({
    resolver: zodResolver(animalSchema),
    defaultValues: animal ? { name: animal.name, type: animal.type, age: animal.age } : { type: 'cat', age: 0 },
  });

  const mutation = useMutation({
    mutationFn: (data: AnimalFormValues) =>
      isEdit && animal ? updateAnimal(animal.id, data) : createAnimal(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['animals'] });
      reset();
      if (onSuccess) onSuccess();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => animal ? deleteAnimal(animal.id) : Promise.resolve(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['animals'] });
      if (onSuccess) onSuccess(true, 'deleted');
    },
  });

  const onSubmit = (data: AnimalFormValues) => {
    mutation.mutate(data);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <TextInput
            label="Name"
            placeholder="Enter animal name"
            {...register('name')}
            error={errors.name?.message}
            required
          />
          <Controller
            name="type"
            control={control}
            render={({ field, fieldState }) => (
              <Select
                label="Type"
                data={[
                  { value: 'cat', label: 'Cat' },
                  { value: 'dog', label: 'Dog' },
                  { value: 'other', label: 'Other' },
                ]}
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
                required
              />
            )}
          />
          <Controller
            name="age"
            control={control}
            render={({ field, fieldState }) => (
              <NumberInput
                label="Age"
                min={0}
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
          <Button type="submit" loading={mutation.isPending} disabled={mutation.isPending} color={ANIMAL_COLOR}>
            Save
          </Button>
        </Flex>
        {mutation.isError && <Text c="red" mt="sm">Error saving animal</Text>}
        {deleteMutation.isError && <Text c="red" mt="sm">Error deleting animal</Text>}
      </form>
    </Card>
  );
} 