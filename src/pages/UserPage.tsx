import { Container, Flex, Paper, Title } from '@mantine/core'
import { IconUser } from '@tabler/icons-react'
import { UserTable } from '../components/UserTable'
import { UserForm } from '../components/UserForm'

export default function Users() {
  return (
    <Container size="md" py="xl">
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
