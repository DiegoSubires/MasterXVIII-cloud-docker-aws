import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { CharacterListScene } from "@/scenes/character-list.scene";
import { CharacterDetailScene } from "@/scenes/character-detail.scene";

export const AppRouter: React.FC = () => {
  return (
    <Router>
      <main style={{ minHeight: "calc(100vh - 70px)" }}>
        <Routes>
          <Route path="/characters" element={<CharacterListScene />} />
          <Route path="/character/:id" element={<CharacterDetailScene />} />
          <Route path="*" element={<Navigate to="/characters" replace />} />
        </Routes>
      </main>
    </Router>
  );
};
