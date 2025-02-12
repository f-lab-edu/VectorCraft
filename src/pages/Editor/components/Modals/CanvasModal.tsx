import { Button } from "@/components/common/Button/Button";
import { CreateCanvasModalProps } from "@/types/components/modal";

import { useCanvasStore } from "@/store/useCanvasStore";

export const CreateCanvasModal = ({
  onClose,
  onCreate,
}: CreateCanvasModalProps) => {
  const {
    newCanvas,
    setNewCanvasWidth,
    setNewCanvasHeight,
    setNewCanvasBackgroundColor,
  } = useCanvasStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(newCanvas.width, newCanvas.height, newCanvas.backgroundColor);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-[400px]">
        <h2 className="text-lg font-bold mb-4">새 캔버스 만들기</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">가로 (px)</label>
            <input
              type="number"
              value={newCanvas.width}
              onChange={(e) => setNewCanvasWidth(Number(e.target.value))}
              className="w-full border rounded px-2 py-1"
              min={100}
              max={2000}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">세로 (px)</label>
            <input
              type="number"
              value={newCanvas.height}
              onChange={(e) => setNewCanvasHeight(Number(e.target.value))}
              className="w-full border rounded px-2 py-1"
              min={100}
              max={2000}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">배경색</label>
            <input
              type="color"
              value={newCanvas.backgroundColor}
              onChange={(e) => setNewCanvasBackgroundColor(e.target.value)}
              className="w-full h-10"
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button onClick={onClose} variant="ghost">
              취소
            </Button>
            <Button type="submit" variant="primary">
              생성
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
