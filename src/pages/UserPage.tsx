import { Container, Flex, Paper, Title, Button } from '@mantine/core'
import { IconUser, IconArrowLeft } from '@tabler/icons-react'
import { UserTable } from '../components/UserTable'
import { UserForm } from '../components/UserForm'
import { useNavigate } from 'react-router-dom'

export default function Users() {
  const navigate = useNavigate();
  return (
    <Container size="md" py="xl">
      <Button onClick={() => navigate('/')} mb="md" variant="light" leftSection={<IconArrowLeft size={18} />}>
        Back to main page
      </Button>
      <Paper p="xl" radius="md" shadow="md" bg="white">
        <Flex direction="column" gap="lg">
          <Flex align="center" gap="sm">
            <IconUser size={32} />
            <Title order={1}>Users</Title>
          </Flex>
          <UserForm />
          <UserTable />
        </Flex>
      </Paper>
    </Container>
  )
}
