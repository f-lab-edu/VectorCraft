import { useShapes } from "@/contexts/ShapeContext";
import { CanvasProps } from "@/types/components/canvas";
import { Shape } from "@/components/Shapes/Shape";

export const EditorCanvas = ({
  width,
  height,
  backgroundColor,
}: CanvasProps) => {
  const { shapes, selectShape } = useShapes();

  if (!width || !height) {
    return null;
  }

  return (
    <div
      className="relative border border-gray-300"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor,
      }}
    >
      <svg width={width} height={height}>
        {shapes.map((shape) => (
          <Shape
            key={shape.id}
            shape={shape}
            onClick={() => selectShape(shape.id)}
          />
        ))}
      </svg>
    </div>
  );
};
