import { useState, useEffect } from "react";
import { todoApi } from "../services/api";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Grid,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddTodoForm from "./AddTodoForm";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const categories = ["A faire", "En cours", "Terminé"];

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await todoApi.getAll();
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
      if (error.message === "Authentication failed") {
        localStorage.removeItem("token");
        window.location.reload();
      }
    }
  };

  const handleDragStart = (e, todoId) => {
    e.dataTransfer.setData("todoId", todoId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e, category) => {
    e.preventDefault();
    const todoId = e.dataTransfer.getData("todoId");
    try {
      const todoToUpdate = todos.find((todo) => todo._id === todoId);
      await todoApi.update(todoId, {
        title: todoToUpdate.title,
        category: category,
      });
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo category:", error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await todoApi.delete(id);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <AddTodoForm onTodoAdded={fetchTodos} />

      <Grid container spacing={2} sx={{ mt: 3 }}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={3} key={category}>
            <Paper
              sx={{
                p: 2,
                minHeight: 400,
                backgroundColor: "#f5f5f5",
              }}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, category)}
            >
              <Typography
                variant="h6"
                sx={{ mb: 2, textTransform: "capitalize" }}
              >
                {category}
              </Typography>

              {todos
                .filter((todo) => todo.category === category)
                .map((todo) => (
                  <Card
                    key={todo._id}
                    sx={{ mb: 1 }}
                    draggable
                    onDragStart={(e) => handleDragStart(e, todo._id)}
                  >
                    <CardContent sx={{ pb: 0 }}>
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography>{todo.title}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {todo.label}
                        </Typography>
                      </Box>
                    </CardContent>
                    <CardActions>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteTodo(todo._id)}
                        color="error"
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                ))}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
