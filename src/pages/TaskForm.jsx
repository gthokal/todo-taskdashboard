
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import useTaskStore from "../store/store";
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  MenuItem,
  Select,
  Typography,
  Stack,
  FormControl,
  InputLabel
} from "@mui/material";

const statuses = ["To Do", "In Progress", "Done"];

const TaskForm = ({ isEdit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, addTask, updateTask, deleteTask } = useTaskStore();

  const existing = tasks.find((t) => t.id === id) || {};

  const [form, setForm] = useState({
    title: existing.title || "",
    description: existing.description || "",
    priority: existing.priority || "Medium",
    status: existing.status || "To Do",
    assignee: existing.assignee || "",
    dueDate: existing.dueDate || "",
  });

  const handleSave = () => {
    if (!form.title) return alert("Title required");

    const today = new Date().toISOString().split("T")[0];
    if (form.dueDate && form.dueDate < today) return alert("Past date not allowed");

    if (isEdit) updateTask(id, form);
    else addTask({ ...form, id: Date.now().toString() });

    navigate("/");
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mt: 4,
          borderRadius: 3,
        }}
      >
        {/* Header */}
        <Typography variant="h6" fontWeight="bold" mb={2}>
          {isEdit ? "Edit Task" : "Create Task"}
        </Typography>

        <Stack spacing={2}>
          {/* Title */}
          <TextField
            label="Title"
            fullWidth
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          {/* Description */}
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          {/* Assignee */}
          <TextField
            label="Assignee"
            fullWidth
            value={form.assignee}
            onChange={(e) =>
              setForm({ ...form, assignee: e.target.value })
            }
          />

          {/* Priority + Status (side by side) */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Priority</InputLabel>
              <Select
                value={form.priority}
                label="Priority"
                onChange={(e) =>
                  setForm({ ...form, priority: e.target.value })
                }
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={form.status}
                label="Status"
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value })
                }
              >
                {statuses.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          {/* Due Date */}
          <TextField
            label="Due Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={form.dueDate}
            onChange={(e) =>
              setForm({ ...form, dueDate: e.target.value })
            }
          />

          {/* Buttons */}
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            {isEdit && (
              <Button
                color="error"
                variant="outlined"
                onClick={() => {
                  if (window.confirm("Delete task?")) {
                    deleteTask(id);
                    navigate("/");
                  }
                }}
              >
                Delete
              </Button>
            )}

            <Button
              variant="contained"
              onClick={handleSave}
              sx={{ borderRadius: 2 }}
            >
              Save
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
};

export default TaskForm