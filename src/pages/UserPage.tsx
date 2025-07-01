import { Container, Flex, Paper, Title, Button, Alert } from '@mantine/core'
import { IconUser, IconArrowLeft, IconCheck } from '@tabler/icons-react'
import { UserTable } from '../components/UserTable'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ActionToggle } from '../components/ActionToggle'

export default function Users() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  return (
    <Container size="100%" py="md" style={{ maxWidth: '100vw' }}>
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
          <UserTable onUserAdded={() => {
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 2000);
          }} />
        </Flex>
      </Paper>
      {showSuccess && (
        <div style={{ position: 'fixed', right: 24, bottom: 24, zIndex: 9999, minWidth: 300 }}>
          <Alert
            variant="light"
            color="green"
            radius="lg"
            title="User created"
            icon={<IconCheck />}
          >
            The user was successfully added.
          </Alert>
        </div>
      )}
    </Container>
  )
}
