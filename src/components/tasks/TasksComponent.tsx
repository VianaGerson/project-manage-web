// src/components/TasksComponent.tsx

import React, { useState } from "react";
import type { Project } from "../../types";
import TasksList from "./TasksList";

import Button from "@mui/material/Button";
import { List, Box, Typography } from "@mui/material";
import TasksForm from "./TaskForm";
import { Add } from "@mui/icons-material";

interface TasksComponentProps {
  project: Project;
  onUpdate: () => void;
}

const API_URL = import.meta.env.VITE_API_URL;

const TasksComponent: React.FC<TasksComponentProps> = ({
  project,
  onUpdate,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const totalTasks = project.tasks.length;
  const completedTasks = project.tasks.filter((t) => t.completed).length;

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const onToggle = async (taskId: number) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}/toggle`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: true }),
      });
      if (!response.ok) {
        throw new Error("Erro ao marcar tarefa.");
      }
      onUpdate();
    } catch (error) {
      alert("Não foi possível efetuar a operação.");
    }
  };

  const onDelete = async (taskId: number) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: true }),
      });
      if (!response.ok) {
        throw new Error("Erro ao marcar tarefa como concluída.");
      }
      onUpdate();
    } catch (error) {
      alert("Não foi possível concluir a tarefa.");
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, m: 2}}>
        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              width: `${project.progress}%`,
              height: 8,
              background: project.progress === 100 ? '#22c55e' : '#6366f1',
            }}
          />
        </Box>
        <Typography variant="body2" color="textSecondary">
          {completedTasks}/{totalTasks} tarefas
        </Typography>
      </Box>
      <List component="div" disablePadding sx={{ pl: 4 }}>
        <TasksList tasks={project.tasks} onToggle={onToggle} onDelete={onDelete} />

        <Button
          variant="outlined"
          color="primary"
          startIcon={<Add />}
          onClick={handleOpenModal}
          sx={{ mt: 2, mb: 1 }}
        >
          Adicionar Tarefa
        </Button>

        <TasksForm
          openModal={openModal}
          projectId={project.id}
          setOpenModal={setOpenModal}
          onUpdate={onUpdate}
        />
      </List>
    </>
  );
};

export default TasksComponent;
