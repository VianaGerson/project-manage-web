// src/App.tsx

import React from "react";
import ProjectsComponent from "./components/projects/ProjectsComponent";
import { Box, Typography } from "@mui/material";

const App: React.FC = () => {

  return (
    <Box className="container mx-auto p-8 max-w-4xl">
      <Typography variant="h3" className="text-center" sx={{ mb: 4 }}>
        📋 Gerenciador de Projetos
      </Typography>

      <ProjectsComponent />
    </Box>
  );
};

export default App;
