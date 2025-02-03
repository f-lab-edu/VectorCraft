import { CircleShape as CircleShapeType } from "@/types/shape";

interface CircleShapeProps {
  shape: CircleShapeType;
  onClick?: () => void;
}

export const CircleShape = ({ shape, onClick }: CircleShapeProps) => {
  return (
    <circle
      cx={shape.x}
      cy={shape.y}
      r={shape.radius}
      fill={shape.fill}
      stroke={shape.stroke}
      strokeWidth={shape.strokeWidth}
      onClick={onClick}
      className={`cursor-pointer ${shape.isSelected ? "outline-blue-500" : ""}`}
    />
  );
};
