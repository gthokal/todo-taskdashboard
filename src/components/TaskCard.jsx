
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Avatar,
  Stack,
  Box
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { Draggable } from "@hello-pangea/dnd";
import { useNavigate } from "react-router-dom";

const TaskCard = ({ task, index }) => {
  const navigate = useNavigate();

  const priorityColor = {
    Low: "success",
    Medium: "warning",
    High: "error",
  };

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(prov) => (
        <Card
          ref={prov.innerRef}
          {...prov.draggableProps}
          {...prov.dragHandleProps}
          onClick={() => navigate(`/task/${task.id}`)}
          sx={{
            mb: 1.5,
            borderRadius: 2,
            border: "1px solid #e0e0e0",
            boxShadow: "none",
            cursor: "grab",
            transition: "all 0.2s ease",
            "&:hover": {
              boxShadow: 3,
              backgroundColor: "#f4f5f7",
              transform: "translateY(-2px)",
            },
            "&:active": {
              cursor: "grabbing",
            },
          }}
        >
          <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mt={1}
            >
              <Typography
              variant="body1"
              fontWeight={500}
              sx={{ mb: 1 }}
              >
                {task.title}
              </Typography>

              <Chip
                label={task.priority}
                size="small"
                color={priorityColor[task.priority]}
                sx={{
                  height: 22,
                  fontSize: "0.7rem",
                  mb: 1,
                }}
              />
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-start"
              mt={1}
            >
              <Avatar sx={{ bgcolor: deepOrange[500], width: 26, height: 26, fontSize: "0.8rem", mr: 1}}>
                {task.assignee?.charAt(0) || "U"}
              </Avatar>
              <Typography variant="subtitle1" sx={{}}>{task.assignee}</Typography>
            </Stack>
            
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-start"
              mt={1}
            >
              <Typography
                  variant="caption"
                  sx={{ color: "gray" }}
                >
                Due Date: {task.dueDate || "No date"}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
};

export default TaskCard;
