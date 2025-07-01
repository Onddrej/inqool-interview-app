import { Container, Flex, Paper, Title } from '@mantine/core'
import { UserTable } from '../components/UserTable'
import { UserForm } from '../components/UserForm'

export default function Users() {
  return (
    <Container size="md" py="xl">
      <Paper p="xl" radius="md" shadow="md" bg="white">
        <Flex direction="column" gap="lg">
          <Title order={1}>Users</Title>
          <UserForm />
          <UserTable />
        </Flex>
      </Paper>
    </Container>
  )
}
