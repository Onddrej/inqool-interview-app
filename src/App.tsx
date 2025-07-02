import React, { useState } from "react";
import { Button, Flex, Title, useComputedColorScheme } from "@mantine/core";
import { Routes, Route, useNavigate } from "react-router-dom";
import UsersPage from "./pages/UserPage";
import AnimalsPage from "./pages/AnimalPage";
import { IconUser, IconPaw } from "@tabler/icons-react";
import { USER_COLOR, ANIMAL_COLOR } from "./style/colors";
import { ActionToggle } from "./components/ActionToggle";

type RippleState = {
  x: number;
  y: number;
  color: string;
  path: string;
} | null;

function Home() {
  const navigate = useNavigate();
  const [ripple, setRipple] = useState<RippleState>(null);
  const colorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  const handleClick = (path: string, color: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    setRipple({ x, y, color, path });

    setTimeout(() => {
      navigate(path);
      setTimeout(() => setRipple(null), 50);
    }, 350);
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      h="100vh"
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundImage: colorScheme === 'dark' ? 'url("/bg-dark.png")' : 'url("/bg.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 1000 }}>
        <ActionToggle />
      </div>
      {(!ripple) && (
        <>
          <Title order={1}>
            I want to{" "}
            <span style={{ color: USER_COLOR, textDecoration: "bold" }}>
              interact with...
            </span>
          </Title>
          <Flex mih={100} gap="sm" justify="center" align="center" direction="row" wrap="wrap">
            <Button
              variant="filled"
              size="xl"
              radius="md"
              onClick={handleClick("/users", USER_COLOR)}
            >
              <Flex direction="column" align="center" gap={2}>
                <IconUser size={28} />
                <span>Users</span>
              </Flex>
            </Button>
            <Button
              variant="filled"
              size="xl"
              radius="md"
              style={{ backgroundColor: ANIMAL_COLOR }}
              onClick={handleClick("/animals", ANIMAL_COLOR)}
            >
              <Flex direction="column" align="center" gap={2}>
                <IconPaw size={28} />
                <span>Animals</span>
              </Flex>
            </Button>
          </Flex>
        </>
      )}
      {ripple && (
        <div
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            width: "100vw",
            height: "100vh",
            pointerEvents: "none",
            zIndex: 9999,
            overflow: "hidden",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: ripple.x,
              top: ripple.y,
              width: 0,
              height: 0,
              borderRadius: "50%",
              background: ripple.color,
              transform: "translate(-50%, -50%) scale(0)",
              animation: "ripple-expand 0.35s forwards",
            }}
          />
          <style>
            {`
              @keyframes ripple-expand {
                to {
                  width: 200vw;
                  height: 200vw;
                  transform: translate(-50%, -50%) scale(1);
                  opacity: 1;
                }
              }
            `}
          </style>
        </div>
      )}
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