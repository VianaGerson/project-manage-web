import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

interface ProjectsFormProps {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  onUpdate: () => void;
}

const API_URL = import.meta.env.VITE_API_URL;

const ProjectsForm: React.FC<ProjectsFormProps> = ({
  openModal,
  setOpenModal,
  onUpdate,
}) => {
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [newProjectName, setNewProjectName] = useState("");

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setCreateError(null);
    try {
      const response = await fetch(`${API_URL}/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newProjectName }),
      });
      if (!response.ok) {
        throw new Error("Erro ao criar projeto.");
      }
      setOpenModal(false);
      setNewProjectName("");
    } catch (err) {
      setCreateError(
        err instanceof Error
          ? err.message
          : "Erro desconhecido ao criar projeto."
      );
    } finally {
      setCreating(false);
      onUpdate();
    }
  };

  return (
    <Dialog open={openModal} onClose={handleCloseModal}>
      <DialogTitle>Criar Novo Projeto</DialogTitle>

      <DialogContent>
        <Box component="form" onSubmit={handleCreateProject}>
          <TextField
            label="Nome do Projeto"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            required
            autoFocus
          />
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
              disabled={creating || !newProjectName}
            >
              {creating ? "Criando..." : "Criar"}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectsForm;
