import { Button } from "@/components/common/Button/Button";

import { useShapeStore } from "@/store/useShapeStore";
import { HeaderProps } from "@/types/components/header";
import { exportToPng } from "@/utils/exportCanvas";
import { exportSettings, importSettings } from "@/utils/jsonManager";
import { useRef } from "react";

export const Header = ({ onReset, canvasRef }: HeaderProps) => {
  const { shapes } = useShapeStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExportSettings = () => {
    exportSettings(shapes);
  };

  const handleImportSettings = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const importedShapes = await importSettings(file);
    useShapeStore.setState({ shapes: importedShapes });
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleExportPng = () => {
    if (canvasRef.current) {
      exportToPng(canvasRef.current);
    }
  };

  return (
    <header className="bg-[#F1F2F4] px-4 py-2 border-b border-gray-300">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <label className="text-lg">VectorCraft</label>
          <Button onClick={onReset}>초기화</Button>
        </div>

        <div className="flex gap-4 text-sm">
          <Button onClick={handleExportSettings}>설정 내보내기</Button>

          <Button onClick={handleImportClick}>설정 불러오기</Button>
          <Button onClick={handleExportPng}>PNG다운로드</Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImportSettings}
            accept=".json"
            className="hidden"
          />
        </div>
      </div>
    </header>
  );
};
