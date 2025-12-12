// src/components/ProjectsComponent.tsx

import React, { useState, useEffect, useCallback } from "react";
import type { Project } from "../../types";
import ProjectsList from "./ProjectsList";

import Button from "@mui/material/Button";
import ProjectsForm from "./ProjectForm";
import { Box, Typography } from "@mui/material";

const API_URL = import.meta.env.VITE_API_URL;

const ProjectsComponent: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);

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
      const data: Project[] = await response.json();
      setProjects(data);
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
        <Typography className="text-indigo-600 text-center">Carregando projetos...</Typography>
      )}
      {error && <Typography className="text-red-500 text-center">Erro: {error}</Typography>}

      {!loading && !error && projects.length === 0 && (
        <Typography className="text-gray-500 text-center">
          Nenhum projeto encontrado. Crie um novo acima!
        </Typography>
      )}

      {!loading && projects.length > 0 && (
        <ProjectsList projects={projects} onUpdate={fetchProjects}/>
      )}

      <Button
        className="mb-4 px-4 py-2"
        variant="contained"
        onClick={handleOpenModal}
      >
        Adicionar Projeto
      </Button>

      <ProjectsForm openModal={openModal} setOpenModal={setOpenModal} onUpdate={fetchProjects} />
    </Box>
  );
};

export default ProjectsComponent;
