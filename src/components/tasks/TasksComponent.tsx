// src/components/TasksComponent.tsx

import React, { useState } from "react";
import type { Task } from "../../types";
import TasksList from "./TasksList";

import Button from "@mui/material/Button";
import { List } from "@mui/material";
import TasksForm from "./TaskForm";

interface TasksComponentProps {
  tasks: Task[];
  projectId: number;
  onUpdate: () => void;
}

const API_URL = import.meta.env.VITE_API_URL;

const TasksComponent: React.FC<TasksComponentProps> = ({
  tasks,
  projectId,
  onUpdate,
}) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const onComplete = async (taskId: number) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}/toggle`, {
        method: "PATCH",
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
    <List component="div" disablePadding sx={{ pl: 4 }}>
      <TasksList tasks={tasks} onComplete={onComplete} />

      <Button onClick={handleOpenModal}>Adicionar Tarefa</Button>

      <TasksForm
        openModal={openModal}
        projectId={projectId}
        setOpenModal={setOpenModal}
        onUpdate={onUpdate}
      />
    </List>
  );
};

export default TasksComponent;
