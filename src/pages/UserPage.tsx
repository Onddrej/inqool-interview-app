import { Flex, Title } from '@mantine/core'
import { UserTable } from '../components/UserTable'
import { UserForm } from '../components/UserForm'

export default function Users() {

  return (
    <Flex direction="column" gap="md">
      <Title order={1}>Users</Title>
      <UserForm />
      <UserTable />
    </Flex>
  )
}
