import { useEffect } from "react";
import { useShapeStore } from "@/store/useShapeStore";
import { useCanvasStore } from "@/store/useCanvasStore";
import { realtimeManager } from "@/lib/realtime";
import { Shape } from "@/types/shape";

export const useRealtimeChannel = (canvasId: string | undefined) => {
  const { addShape, updateShape, deleteShape, reset } = useShapeStore();
  const { setBackgroundColor } = useCanvasStore();

  useEffect(() => {
    if (!canvasId) return;

    const initializeRealtime = async () => {
      try {
        const { channel, shapes } = await realtimeManager.initialize(canvasId);

        reset();
        shapes.forEach(addShape);

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
              setBackgroundColor(payload.backgroundColor);
            }
          })
          .subscribe();
      } catch (error) {
        console.error("초기화 실패:", error);
      }
    };

    initializeRealtime();

    return () => {
      realtimeManager.disconnect();
    };
  }, [canvasId, addShape, updateShape, deleteShape, setBackgroundColor, reset]);

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
