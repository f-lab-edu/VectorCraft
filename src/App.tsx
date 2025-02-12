import { EditorPage } from "@/pages/Editor";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={`/editor`} replace />} />
        <Route path="/editor" element={<EditorPage />} />
        <Route path="/editor/:canvasId" element={<EditorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
