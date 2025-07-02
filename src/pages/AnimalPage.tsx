import { Container, Flex, Paper, Title, Button } from '@mantine/core';
import { IconPaw, IconArrowLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { AnimalTable } from '../components/AnimalTable';
import { ActionToggle } from '../components/ActionToggle';

export default function AnimalsPage() {
  const navigate = useNavigate();
  return (
    <Container size="100%" py="md" style={{ maxWidth: '100vw', minHeight: '100vh' }}>
      <Flex justify="space-between" align="center" mb="md">
        <Button onClick={() => navigate('/')} radius="md" variant="light" leftSection={<IconArrowLeft size={18} />}>
          Back to main page
        </Button>
        <ActionToggle />
      </Flex>
      <Paper p="md" radius="md" shadow="md" bg="white" style={{ width: '100%' }}>
        <Flex direction="column" gap="md">
          <Flex align="center" gap="sm">
            <IconPaw size={32} />
            <Title order={1}>Animals</Title>
          </Flex>
          <AnimalTable />
        </Flex>
      </Paper>
    </Container>
  );
}
