import { RectangleShape as RectangleShapeType } from "@/types/shape";

interface RectangleShapeProps {
  shape: RectangleShapeType;
  onClick?: () => void;
}

export const RectangleShape = ({ shape, onClick }: RectangleShapeProps) => {
  return (
    <rect
      x={shape.x}
      y={shape.y}
      width={shape.width}
      height={shape.height}
      rx={shape.borderRadius}
      ry={shape.borderRadius}
      fill={shape.fill}
      stroke={shape.stroke}
      strokeWidth={shape.strokeWidth}
      onClick={onClick}
      className={`cursor-pointer ${shape.isSelected ? "outline-blue-500" : ""}`}
    />
  );
};
