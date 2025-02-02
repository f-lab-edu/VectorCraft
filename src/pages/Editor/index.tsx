import { useState } from "react";
import { BaseLayout } from "@/components/Layout/BaseLayout";
import { Header } from "@/components/Layout/Header";
import { SettingsPanel } from "@/pages/Editor/components/Settings/SettingsPanel";
import { ToolPanel } from "@/pages/Editor/components/Tools/ToolPanel";
import { LayerPanel } from "@/pages/Editor/components/Layers/LayerPanel";
import { Container } from "@/components/Layout/Container";
import { Content } from "@/components/Layout/Content";
import { PanelContainer } from "@/components/Layout/PanelContainer";
import { CreateCanvasModal } from "@/pages/Editor/components/Modals/CanvasModal";
import { ToolType } from "@/types/components/tools";
import { EditorCanvas } from "./components/Canvas/EditorCanvas";

export const EditorPage = () => {
  const [showCanvasModal, setShowCanvasModal] = useState(true);
  const [canvasProps, setCanvasProps] = useState<{
    width?: number;
    height?: number;
    backgroundColor?: string;
  }>();
  const [selectedTool, setSelectedTool] = useState<ToolType>("cursor");
  const handleSelectTool = (tool: ToolType) => {
    setSelectedTool(tool);
  };

  const handleCreateCanvas = (
    width: number,
    height: number,
    backgroundColor: string
  ) => {
    setCanvasProps({ width, height, backgroundColor });
    setShowCanvasModal(false);
  };

  const handleChangeBackgroundColor = (color: string) => {
    setCanvasProps((prev) =>
      prev ? { ...prev, backgroundColor: color } : prev
    );
  };

  const handleResetCanvas = () => {
    setShowCanvasModal(true);
  };

  return (
    <BaseLayout>
      <Header onReset={handleResetCanvas} />
      <Container>
        <PanelContainer position="left" width={48}>
          <ToolPanel
            selectedTool={selectedTool}
            onSelectTool={handleSelectTool}
          />
        </PanelContainer>
        <Content>
          <EditorCanvas {...canvasProps} />
        </Content>
        <PanelContainer position="right" width={256} className="p-4">
          <SettingsPanel
            selectedTool={selectedTool}
            backgroundColor={canvasProps?.backgroundColor || "#FFFFFF"}
            onChangeBackgroundColor={handleChangeBackgroundColor}
          />
        </PanelContainer>
      </Container>
      <PanelContainer position="bottom" height={220} className="p-4">
        <LayerPanel />
      </PanelContainer>

      {showCanvasModal && (
        <CreateCanvasModal
          onClose={() => setShowCanvasModal(false)}
          onCreate={handleCreateCanvas}
        />
      )}
    </BaseLayout>
  );
};

export default EditorPage;
