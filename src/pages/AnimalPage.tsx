import { Container, Flex, Paper, Title, Button } from '@mantine/core';
import { IconPaw, IconArrowLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { AnimalTable } from '../components/animals/AnimalTable';
import { ActionToggle } from '../components/shared/ActionToggle';
import { useState } from 'react';
import { ActionAlert, type AlertType } from '../components/shared/ActionAlert';
import { ANIMAL_COLOR } from '../style/colors';
import { useComputedColorScheme } from '@mantine/core';

export default function AnimalsPage() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [alertType, setAlertType] = useState<AlertType>('added');
  const colorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
  return (
    <Container size="100%" py="md" style={{ maxWidth: '100vw', minHeight: '100vh' }}>
      <Flex justify="space-between" align="center" mb="md">
        <Button onClick={() => navigate('/')} radius="md" variant="light" leftSection={<IconArrowLeft size={18} />} color={ANIMAL_COLOR}>
          Back to main page
        </Button>
        <ActionToggle />
      </Flex>
      <Paper
        p="md"
        radius="md"
        shadow="md"
        style={{ width: '100%', background: colorScheme === 'dark' ? '#23272e' : 'white' }}
      >
        <Flex direction="column" gap="md">
          <Flex align="center" gap="sm">
            <IconPaw size={32} />
            <Title order={1}>Animals</Title>
          </Flex>
          <AnimalTable onAnimalChanged={(type: AlertType = 'added') => {
            setAlertType(type);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 4000);
          }} />
        </Flex>
      </Paper>
      <ActionAlert type={alertType} show={showSuccess} entityName="Animal" />
    </Container>
  );
}
