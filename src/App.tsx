import { Button, Flex, Title } from "@mantine/core";

function App() {
  return (
    <Flex direction="column" align="center" justify="center" h="100vh">
      <Title order={1}>Do you want to interact with ...</Title>
      <Flex
        mih={100}
        gap="sm"
        justify="center"
        align="center"
        direction="row"
        wrap="wrap"
      >
        <Button variant="filled" size="xl" radius="md">
          Users
        </Button>
        <Button variant="filled" size="xl" radius="md">
          Animals
        </Button>
      </Flex>
    </Flex>
  );
}

export default App;
