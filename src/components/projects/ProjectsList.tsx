import React from "react";
import type { Project } from "../../types";

import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import TasksComponent from "../tasks/TasksComponent";

interface ProjectsListProps {
  projects: Project[];
  onUpdate: () => void;
}

const ProjectsList: React.FC<ProjectsListProps> = ({ projects, onUpdate }) => {
  const [openProjectId, setOpenProjectId] = React.useState<number | null>(null);

  const handleClick = (projectId: number) => {
    setOpenProjectId((prevId) => (prevId === projectId ? null : projectId));
  };

  return (
    <>
      {projects.map((project) => (
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          className="bg-gray-50 rounded-lg shadow-md"
          key={project.id}
          sx={{ mb: 1 }}
        >
          <ListItemButton onClick={() => handleClick(project.id)}>
            <ListItemIcon>
              {openProjectId === project.id ? <ExpandLess /> : <ExpandMore />}
            </ListItemIcon>
            <ListItemText primary={project.name} />
            <Box>
              <Box className="text-sm font-medium mb-1 flex justify-between">
                <Typography>Progresso:</Typography>
                <Typography>{project.progress.toFixed(2)}%</Typography>
              </Box>
              <Box className="w-full bg-gray-200 rounded-full h-2.5">
                <Box
                  className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${project.progress}%` }}
                ></Box>
              </Box>
            </Box>
          </ListItemButton>
          <Collapse
            in={openProjectId === project.id}
            timeout="auto"
            unmountOnExit
          >
            <TasksComponent tasks={project.tasks} projectId={project.id} onUpdate={onUpdate} />
          </Collapse>
        </List>
      ))}
    </>
  );
};

export default ProjectsList;
