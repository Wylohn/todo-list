import { useState } from "react";
import { todoApi } from "../services/api";
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

export default function AddTodoForm({ onTodoAdded }) {
  const [newTodo, setNewTodo] = useState("");
  const [category, setCategory] = useState("A faire");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      await todoApi.create({
        title: newTodo,
        category: category,
      });
      setNewTodo("");
      onTodoAdded();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", gap: 2 }}
    >
      <TextField
        fullWidth
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Nouvelle tâche"
        variant="outlined"
        size="small"
      />
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Catégorie</InputLabel>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          label="Catégorie"
          size="small"
        >
          <MenuItem value="A faire">A faire</MenuItem>
          <MenuItem value="En cours">En cours</MenuItem>
          <MenuItem value="Terminé">Terminé</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained">
        Ajouter
      </Button>
    </Box>
  );
}
