import React, { useState } from "react";
import { Button, Flex, Title } from "@mantine/core";
import { Routes, Route, useNavigate } from "react-router-dom";
import UsersPage from "./pages/UserPage";
import AnimalsPage from "./pages/AnimalPage";

type RippleState = {
  x: number;
  y: number;
  color: string;
  path: string;
} | null;

function Home() {
  const navigate = useNavigate();
  const [ripple, setRipple] = useState<RippleState>(null);

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
    <Flex direction="column" align="center" justify="center" h="100vh" style={{ position: "relative", overflow: "hidden" }}>
      {(!ripple) && (
        <>
          <Title order={1}>Do you want to interact with ...</Title>
          <Flex mih={100} gap="sm" justify="center" align="center" direction="row" wrap="wrap">
            <Button
              variant="filled"
              size="xl"
              radius="md"
              onClick={handleClick("/users", "#228be6")}
            >
              Users
            </Button>
            <Button
              variant="filled"
              size="xl"
              radius="md"
              onClick={handleClick("/animals", "#fa5252")}
            >
              Animals
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