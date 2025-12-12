import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import type { Difficulty } from "../../types";

interface TasksFormProps {
  projectId: number;
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  onUpdate: () => void;
}

const API_URL = import.meta.env.VITE_API_URL;

const TasksForm: React.FC<TasksFormProps> = ({
  projectId,
  openModal,
  setOpenModal,
  onUpdate,
}) => {
  const [title, setTitle] = useState("");
  const [difficultyId, setDifficultyId] = useState<number>(1);
  const [difficulties, setDifficulties] = useState<Difficulty[]>([]);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCreateTask = async (e: React.FormEvent) => {
      e.preventDefault();
      setCreating(true);
      setCreateError(null);
      try {
        const response = await fetch(`${API_URL}/tasks`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, difficulty_id: difficultyId, project_id: projectId }),
        });
        if (!response.ok) {
          throw new Error("Erro ao criar tarefa.");
        }
        setOpenModal(false);
        setTitle("");
      } catch (err) {
        setCreateError(
          err instanceof Error
            ? err.message
            : "Erro desconhecido ao criar tarefa."
        );
      } finally {
        setCreating(false);
        onUpdate();
      }
    };

  useEffect(() => {
    if (openModal) {
      fetch(`${API_URL}/difficulties`)
        .then((res) => res.json())
        .then((data) => {
          setDifficulties(data);
          setDifficultyId(data[0]?.id || 1);
        });
    }
  }, [openModal]);

  return (
    <Dialog open={openModal} onClose={handleCloseModal}>
      <DialogTitle>Criar Nova Tarefa</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleCreateTask}
          sx={{ display: "flex", gap: 2, flexDirection: "column" }}
        >
          <TextField
            label="Título da Tarefa"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            select
            label="Dificuldade"
            value={difficultyId}
            onChange={(e) => setDifficultyId(Number(e.target.value))}
            required
            disabled={difficulties.length === 0}
          >
            {difficulties.map((diff) => (
              <MenuItem key={diff.id} value={diff.id}>
                {diff.name} ({diff.effort_points} pontos)
              </MenuItem>
            ))}
          </TextField>
          {createError && <span style={{ color: "red" }}>{createError}</span>}
          <Box
            sx={{ m: 1, display: "flex", gap: 1, justifyContent: "flex-end" }}
          >
            <Button
              onClick={handleCloseModal}
              disabled={creating}
              color="secondary"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={creating || !title.trim()}
            >
              {creating ? "Criando..." : "Criar"}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default TasksForm;
