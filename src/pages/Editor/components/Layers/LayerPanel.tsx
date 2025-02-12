import { IconButton } from "@/components/common/Button/IconButton";
import { ICONS } from "@/constants/icons";

import { useShapeStore } from "@/store/useShapeStore";
import { useRealtimeChannel } from "@/hooks/useRealtimeChannel";
import { useParams } from "react-router-dom";
import { shapeService } from "@/services/shapeService";

export const LayerPanel = () => {
  const { shapes, deleteShape, selectShape, selectedShapeId } = useShapeStore();
  const { canvasId } = useParams();
  const { broadcastShapeDelete } = useRealtimeChannel(canvasId);

  const handleDelete = (id: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      shapeService.deleteShape(id);
      deleteShape(id);
      broadcastShapeDelete(id);
    } catch (error) {
      console.error("도형 삭제 실패:", error);
    }
  };

  return (
    <>
      <div className="text-sm font-bold mb-2">레이어</div>
      <div className="space-y-1">
        {shapes.map((shape) => (
          <div
            key={shape.id}
            className={`
              flex items-center bg-white p-2 rounded cursor-pointer
              ${selectedShapeId === shape.id ? "ring-2 ring-blue-500" : ""}
            `}
            onClick={() => selectShape(shape.id)}
          >
            <span className="text-sm">
              {shape.type} - {shape.id.slice(0, 4)}
            </span>
            <IconButton
              className="ml-auto hover:bg-gray-100 rounded"
              icon={<ICONS.delete className="w-5 h-5 p-1" />}
              title="삭제"
              onClick={handleDelete(shape.id)}
            />
          </div>
        ))}
      </div>
    </>
  );
};
