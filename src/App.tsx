import { EditorPage } from "@/pages/Editor";
import { ShapeProvider } from "@/contexts/ShapeContext";

function App() {
  return (
    <ShapeProvider>
      <EditorPage />
    </ShapeProvider>
  );
}

export default App;
