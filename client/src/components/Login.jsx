import { useState } from "react";
import { authApi, setAuthToken } from "../services/api";
import { Box, TextField, Button, Typography } from "@mui/material";

export default function Login({ onLoginSuccess }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authApi.login(credentials);
      const { token } = response.data;
      setAuthToken(token);
      localStorage.setItem("token", token);
      onLoginSuccess();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", mt: 4 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Connexion
      </Typography>
      {error && (
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Nom d'utilisateur"
          value={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
        />
        <TextField
          fullWidth
          margin="normal"
          type="password"
          label="Mot de passe"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Se connecter
        </Button>
      </form>
    </Box>
  );
}
