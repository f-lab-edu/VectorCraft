import { PolygonShape as PolygonShapeType } from "@/types/shape";

interface PolygonShapeProps {
  shape: PolygonShapeType;
  onClick?: () => void;
}

export const PolygonShape = ({ shape, onClick }: PolygonShapeProps) => {
  const points = calculatePolygonPoints(shape);

  return (
    <polygon
      points={points}
      fill={shape.fill}
      stroke={shape.stroke}
      strokeWidth={shape.strokeWidth}
      onClick={onClick}
      className={`cursor-pointer ${shape.isSelected ? "outline-blue-500" : ""}`}
    />
  );
};

const calculatePolygonPoints = (shape: PolygonShapeType) => {
  const points: string[] = [];
  const angleStep = (2 * Math.PI) / shape.sides;

  for (let i = 0; i < shape.sides; i++) {
    const angle = i * angleStep - Math.PI / 2; // -90도에서 시작하여 위쪽 중앙에서 시작
    const x = shape.x + shape.radius * Math.cos(angle);
    const y = shape.y + shape.radius * Math.sin(angle);
    points.push(`${x},${y}`);
  }

  return points.join(" ");
};
