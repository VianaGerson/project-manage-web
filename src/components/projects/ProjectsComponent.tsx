// src/components/ProjectsComponent.tsx

import React, { useState, useEffect, useCallback } from "react";
import type { Project } from "../../types";
import ProjectsList from "./ProjectsList";

import Button from "@mui/material/Button";
import ProjectsForm from "./ProjectForm";
import { Box, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";

const API_URL = import.meta.env.VITE_API_URL;

const ProjectsComponent: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [openProjectId, setOpenProjectId] = React.useState<number | null>(null);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/projects`);
      if (!response.ok) {
        throw new Error("Falha ao buscar projetos.");
      }
      const data = await response.json();
      setProjects(data.data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erro desconhecido ao carregar dados."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <Box sx={{ spaceY: 6 }}>
      {loading && (
        <Typography className="text-indigo-600 text-center">
          Carregando projetos...
        </Typography>
      )}
      {error && (
        <Typography className="text-red-500 text-center">
          Erro: {error}
        </Typography>
      )}

      {!loading && !error && projects.length === 0 && (
        <Typography className="text-gray-500 text-center">
          Nenhum projeto cadastrado. Clique em “Adicionar Projeto” para começar!
        </Typography>
      )}

      {!loading && projects.length > 0 && (
        <ProjectsList projects={projects} onUpdate={fetchProjects} setOpenProjectId={setOpenProjectId} openProjectId={openProjectId} />
      )}

      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        className="mb-4 px-4 py-2"
        onClick={handleOpenModal}
      >
        Adicionar Projeto
      </Button>

      <ProjectsForm
        openModal={openModal}
        setOpenModal={setOpenModal}
        onUpdate={fetchProjects}
      />
    </Box>
  );
};

export default ProjectsComponent;
