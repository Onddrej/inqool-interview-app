import { Button, Flex, Title } from "@mantine/core";
import { Routes, Route, useNavigate } from "react-router-dom";
import UsersPage from "./pages/UserPage";
import AnimalsPage from "./pages/AnimalPage";

function Home() {
  const navigate = useNavigate();
  return (
    <Flex direction="column" align="center" justify="center" h="100vh">
      <Title order={1}>Do you want to interact with ...</Title>
      <Flex mih={100} gap="sm" justify="center" align="center" direction="row" wrap="wrap">
        <Button variant="filled" size="xl" radius="md" onClick={() => navigate("/users")}>
          Users
        </Button>
        <Button variant="filled" size="xl" radius="md" onClick={() => navigate("/animals")}>
          Animals
        </Button>
      </Flex>
    </Flex>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/animals" element={<AnimalsPage />} />
    </Routes>
  );
}