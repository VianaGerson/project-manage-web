import React from "react";

import { IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { CheckCircleOutline, Done, RadioButtonUnchecked } from "@mui/icons-material";
import type { Task } from "../../types";

interface TasksListProps {
  tasks: Task[];
  onComplete: (taskId: number) => void;
}

const TasksList: React.FC<TasksListProps> = ({ tasks, onComplete }) => {
  return (
    <>
      {tasks.length === 0 ? (
        <ListItemText primary="Nenhuma tarefa cadastrada." />
      ) : (
        tasks.map((task) => (
          <ListItem
            key={task.id}
            secondaryAction={
              !task.completed && (
                <IconButton
                  edge="end"
                  color="primary"
                  onClick={() => onComplete(task.id)}
                  aria-label="concluir"
                >
                  <Done />
                </IconButton>
              )
            }
          >
            <ListItemIcon>
              {task.completed ? (
                <CheckCircleOutline color="success" />
              ) : (
                <RadioButtonUnchecked />
              )}
            </ListItemIcon>
            <ListItemText primary={task.title} />
          </ListItem>
        ))
      )}
    </>
  );
};

export default TasksList;
