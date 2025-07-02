import { Container, Flex, Paper, Title, Button } from '@mantine/core'
import { IconUser, IconArrowLeft } from '@tabler/icons-react'
import { UserTable } from '../components/UserTable'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ActionToggle } from '../components/ActionToggle'
import { ActionAlert, type AlertType } from '../components/ActionAlert'
import { USER_COLOR } from '../style/colors'

export default function Users() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [alertType, setAlertType] = useState<AlertType>('added');
  return (
    <Container size="100%" py="md" style={{ maxWidth: '100vw', minHeight: '100vh'  }}>
      <Flex justify="space-between" align="center" mb="md">
        <Button onClick={() => navigate('/')} radius="md" variant="light" leftSection={<IconArrowLeft size={18} />} color={USER_COLOR}>
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
      <ActionAlert type={alertType} show={showSuccess} entityName="User" />
    </Container>
  )
}
