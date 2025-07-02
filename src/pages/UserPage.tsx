import { Container, Flex, Paper, Title, Button, Alert } from '@mantine/core'
import { IconUser, IconArrowLeft, IconCheck } from '@tabler/icons-react'
import { UserTable } from '../components/UserTable'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ActionToggle } from '../components/ActionToggle'

export default function Users() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [alertType, setAlertType] = useState<'added' | 'edited' | 'banned' | 'deleted'>('added');
  return (
    <Container size="100%" py="md" style={{ maxWidth: '100vw', minHeight: '100vh'  }}>
      <Flex justify="space-between" align="center" mb="md">
        <Button onClick={() => navigate('/')}  radius="md" variant="light" leftSection={<IconArrowLeft size={18} />}>
          Back to main page
        </Button>
        <ActionToggle />
      </Flex>
      <Paper p="md" radius="md" shadow="md" bg="white" style={{ width: '100%' }}>
        <Flex direction="column" gap="md">
          <Flex align="center" gap="sm">
            <IconUser size={32} />
            <Title order={1}>Users</Title>
          </Flex>
          <UserTable onUserAdded={(type = 'added') => {
            setAlertType(type);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 4000);
          }} />
        </Flex>
      </Paper>
      {showSuccess && (
        <div style={{ position: 'fixed', right: 24, bottom: 24, zIndex: 9999, minWidth: 300 }}>
          <Alert
            variant="filled"
            color={alertType === 'banned' || alertType === 'deleted' ? 'red' : 'green'}
            radius="lg"
            title={
              alertType === 'added'
                ? 'User created'
                : alertType === 'edited'
                ? 'User edited'
                : alertType === 'banned'
                ? 'User banned'
                : 'User deleted'
            }
            icon={<IconCheck />}
          >
            {alertType === 'added'
              ? 'The user was successfully added.'
              : alertType === 'edited'
              ? 'The user was successfully edited.'
              : alertType === 'banned'
              ? 'The user was banned.'
              : 'The user was deleted.'}
          </Alert>
        </div>
      )}
    </Container>
  )
}
