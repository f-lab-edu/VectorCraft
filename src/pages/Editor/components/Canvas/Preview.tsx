import { useShapeStore } from "@/store/useShapeStore";
import { useToolStore } from "@/store/useToolStore";
import { calculateShapeDimensions } from "@/utils/shapeCalculator";
import {
  Shape,
  RectangleShape,
  CircleShape,
  PolygonShape,
} from "@/types/shape";

interface PreviewProps {
  renderShape: (shape: Shape) => JSX.Element;
}

export const Preview = ({ renderShape }: PreviewProps) => {
  const { mouse } = useShapeStore();
  const { selectedTool, toolSettings } = useToolStore();
  const { isDrawing, startPoint, endPoint } = mouse;

  if (!isDrawing || !startPoint || !endPoint || selectedTool === "cursor") {
    return null;
  }

  const dimensions = calculateShapeDimensions({
    startPoint,
    endPoint,
    type: selectedTool,
  });

  const baseToolSettings = toolSettings[selectedTool];

  const previewShape =
    {
      rectangle: {
        ...baseToolSettings,
        type: "rectangle" as const,
        borderRadius: 0,
        ...dimensions,
      } as RectangleShape,
      circle: {
        ...baseToolSettings,
        type: "circle" as const,
        ...dimensions,
      } as CircleShape,
      polygon: {
        ...baseToolSettings,
        type: "polygon" as const,
        ...dimensions,
      } as PolygonShape,
    }[selectedTool] ?? null;

  if (!previewShape) return null;
  return renderShape(previewShape);
};
