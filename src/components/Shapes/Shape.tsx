import { Shape as ShapeType } from "@/types/shape";
import { RectangleShape } from "./RectangleShape";
import { CircleShape } from "./CircleShape";
import { PolygonShape } from "./PolygonShape";

interface ShapeProps {
  shape: ShapeType;
  onClick?: () => void;
}

export const Shape = ({ shape, onClick }: ShapeProps) => {
  switch (shape.type) {
    case "rectangle":
      return <RectangleShape shape={shape} onClick={onClick} />;
    case "circle":
      return <CircleShape shape={shape} onClick={onClick} />;
    case "polygon":
      return <PolygonShape shape={shape} onClick={onClick} />;
    default:
      return null;
  }
};
