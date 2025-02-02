import { CanvasProps } from "@/types/components/canvas";

export const EditorCanvas = ({
  width,
  height,
  backgroundColor,
}: CanvasProps) => {
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
      {/* SVG 요소 추가 */}
    </div>
  );
};
