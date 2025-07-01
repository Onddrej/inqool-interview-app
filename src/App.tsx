import { Button, Flex } from "@mantine/core";

function App() {
  return (
    <Flex direction="column" align="center" justify="center" h="100vh">
      <h1>Do you want to interact with ...</h1>
      <Flex
        mih={50}
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
