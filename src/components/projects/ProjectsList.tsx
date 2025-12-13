import React from "react";
import type { Project } from "../../types";

import {
  Avatar,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Folder } from "@mui/icons-material";
import TasksComponent from "../tasks/TasksComponent";

interface ProjectsListProps {
  projects: Project[];
  onUpdate: () => void;
  openProjectId: number | null;
  setOpenProjectId: (id: number | null) => void;
}

const ProjectsList: React.FC<ProjectsListProps> = ({
  projects,
  onUpdate,
  openProjectId,
  setOpenProjectId,
}) => {
  const handleClick = (projectId: number | null) => {
    setOpenProjectId(projectId);
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
              <Avatar sx={{ bgcolor: "#6366f1" }}>
                <Folder />
              </Avatar>
            </ListItemIcon>
            <ListItemText primary={project.name} />
            <Typography variant="body2" color="primary" fontWeight={600}>
              {project.progress}%
            </Typography>
          </ListItemButton>
          <Collapse
            in={openProjectId === project.id}
            timeout="auto"
            unmountOnExit
          >
            <TasksComponent project={project} onUpdate={onUpdate} />
          </Collapse>
        </List>
      ))}
    </>
  );
};

export default ProjectsList;
