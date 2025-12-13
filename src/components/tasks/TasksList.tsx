import React from "react";

import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { CheckCircle, Delete, RadioButtonUnchecked } from "@mui/icons-material";
import type { Task } from "../../types";

interface TasksListProps {
  tasks: Task[];
  onToggle: (taskId: number) => void;
  onDelete: (taskId: number) => void;
}

const TasksList: React.FC<TasksListProps> = ({ tasks, onToggle, onDelete }) => {
  const handleToggle = (taskId: number, is_completed: boolean) => {
    if (
      window.confirm(
        !is_completed
          ? "Deseja marcar esta tarefa como concluída?"
          : "Deseja marcar esta tarefa como não concluída?"
      )
    ) {
      onToggle(taskId);
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
              <IconButton
                size="small"
                color="success"
                onClick={() => handleToggle(task.id, task.completed)}
              >
                {task.completed ? (
                  <CheckCircle fontSize="small" />
                ) : (
                  <RadioButtonUnchecked fontSize="small" />
                )}
              </IconButton>
              <IconButton
                size="small"
                color="error"
                onClick={() => handleDelete(task.id)}
              >
                <Delete fontSize="small" />
              </IconButton>
            </ListItemButton>
          </ListItem>
        ))
      )}
    </>
  );
};

export default TasksList;
