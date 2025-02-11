import { useEffect } from "react";
import { useEditorStore } from "@/store/useEditorStore";
import { realtimeManager } from "@/lib/realtime";
import { Shape } from "@/types/shape";
import { useCanvas } from "@/hooks/useCanvas";

export const useRealtimeChannel = (canvasId: string | undefined) => {
  const { addShape, updateShape, deleteShape } = useEditorStore();
  const { setCanvasProps } = useCanvas(canvasId);

  useEffect(() => {
    if (!canvasId) return;

    const channel = realtimeManager.initialize(canvasId);

    channel
      .on("broadcast", { event: "shape" }, ({ payload }) => {
        switch (payload.type) {
          case "add":
            if (payload.shape) {
              addShape(payload.shape);
            }
            break;
          case "update":
            if (payload.shape) {
              updateShape(payload.shape.id, payload.shape);
            }
            break;
          case "delete":
            if (payload.shapeId) {
              deleteShape(payload.shapeId);
            }
            break;
        }
      })
      .on("broadcast", { event: "canvas" }, ({ payload }) => {
        if (payload.type === "updateBackground") {
          console.log("updateBackground", payload);
          setCanvasProps((prev) =>
            prev ? { ...prev, backgroundColor: payload.backgroundColor } : prev
          );
        }
      })
      .subscribe();

    return () => {
      realtimeManager.disconnect();
    };
  }, [canvasId, addShape, updateShape, deleteShape, setCanvasProps]);

  return {
    broadcastShapeAdd: (shape: Shape) =>
      realtimeManager.broadcastShape({ type: "add", shape }),
    broadcastShapeUpdate: (shape: Shape) =>
      realtimeManager.broadcastShape({ type: "update", shape }),
    broadcastShapeDelete: (shapeId: string) =>
      realtimeManager.broadcastShape({ type: "delete", shapeId }),
    broadcastBackgroundChange: (backgroundColor: string) =>
      realtimeManager.broadcastCanvas({
        type: "updateBackground",
        backgroundColor,
      }),
  };
};
