import React from "react";

import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Delete, Done } from "@mui/icons-material";
import type { Task } from "../../types";

interface TasksListProps {
  tasks: Task[];
  onComplete: (taskId: number) => void;
  onDelete: (taskId: number) => void;
}

const TasksList: React.FC<TasksListProps> = ({
  tasks,
  onComplete,
  onDelete,
}) => {
  const handleComplete = (taskId: number) => {
    if (window.confirm("Deseja marcar esta tarefa como concluída?")) {
      onComplete(taskId);
    }
  };

  const handleDelete = (taskId: number) => {
    if (window.confirm("Deseja realmente excluir esta tarefa?")) {
      onDelete(taskId);
    }
  };

  return (
    <>
      {tasks.length === 0 ? (
        <ListItemText primary="Nenhuma tarefa cadastrada." />
      ) : (
        tasks.map((task) => (
          <ListItem key={task.id}>
            <ListItemButton key={task.id} sx={{ pl: 4 }}>
              <ListItemText
                primary={
                  <span
                    style={{
                      fontWeight: 600,
                      color: task.completed ? "#888" : "#222",
                      textDecoration: task.completed ? "line-through" : "none",
                    }}
                  >
                    {task.title}
                    <span
                      style={{
                        fontWeight: 400,
                        fontSize: 13,
                        marginLeft: 8,
                        color: "#1976d2",
                      }}
                    >
                      {task.difficulty?.name} ({task.difficulty?.effort_points}{" "}
                      pts)
                    </span>
                  </span>
                }
              />
              {!task.completed && (
                <>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleComplete(task.id)}
                  >
                    <Done fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(task.id)}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </>
              )}
            </ListItemButton>
          </ListItem>
        ))
      )}
    </>
  );
};

export default TasksList;
