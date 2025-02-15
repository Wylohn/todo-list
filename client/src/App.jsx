import { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import Login from "./components/Login";
import { Container, Typography } from "@mui/material";
import { setAuthToken } from "./services/api";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <Container>
      <Typography variant="h2" component="h1" align="center" gutterBottom>
        Todo List
      </Typography>
      {isAuthenticated ? (
        <TodoList />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </Container>
  );
}

export default App;
