
import { Button, Container, Grid, Typography, Box } from "@mui/material";
import useTaskStore from "../store/store";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import FilterBar from "../components/filterBar";
import TaskCard from "../components/TaskCard";

const statuses = ["To Do", "In Progress", "Done"];

const Board = () => {
  const { tasks, filters } = useTaskStore();
  const navigate = useNavigate();

  const filtered = tasks.filter((t) => {
    return (
      (!filters.priority || t.priority === filters.priority) &&
      (!filters.assignee || t.assignee?.toLowerCase().includes(filters.assignee.toLowerCase()))
    );
  });

  const onDragEnd = (result) => {
    if (!result.destination) return;
    useTaskStore.getState().updateTask(result.draggableId, {
      status: result.destination.droppableId,
    });
  };

  return (
    <Box sx={{ background: "#f4f5f7", minHeight: "100vh", p: 2 }}>
      <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h5" fontWeight="bold">Task Dashboard</Typography>
            <Button
              variant="contained"
              color="success"
              onClick={() => navigate("/create")}
              sx={{ borderRadius: 2 }}
            >+ New Task</Button>
          </Box>

          <FilterBar />

          <DragDropContext onDragEnd={onDragEnd}>
            <Grid container spacing={2} alignItems="stretch">
              {statuses.map((status) => {
                const columnTasks = filtered.filter((t) => t.status === status);
                return (
                  <Grid 
                  item 
                  xs={12} 
                  sm={6}      
                  md={3}      
                  lg={3}      
                  key={status}
                  sx={{ display: "flex" }}>
                    <Box
                      sx={{
                        background: "#ebecf0",
                        borderRadius: 3,
                        p: 2,
                        width: "300px",
                        display: "flex",
                        flexDirection: "column",        
                      }}
                    >
                      <Typography 
                      variant="subtitle1"
                        fontWeight="bold"
                        sx={{ mb: 2 }}
                      >
                        {status} ({columnTasks.length})
                      </Typography>

                      <Droppable droppableId={status}>
                        {(provided) => (
                          <Box 
                            ref={provided.innerRef} 
                            {...provided.droppableProps}
                            sx={{
                              flexGrow: 1,
                              overflowY: "auto",    
                              minHeight: "200px",
                            }}
                          >
                            {columnTasks.map((task, index) => (
                              <TaskCard key={task.id} task={task} index={index} />
                            ))}
                            {provided.placeholder}
                          </Box>
                        )}
                      </Droppable>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </DragDropContext>
      </Container>
    </Box>
  );
};

export default Board