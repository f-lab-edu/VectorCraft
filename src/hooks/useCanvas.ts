import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { useCanvasStore } from "@/store/useCanvasStore";
import { useShapeStore } from "@/store/useShapeStore";
import { realtimeManager } from "@/lib/realtime";
import { canvasService } from "@/services/canvasService";

export const useCanvas = (canvasId: string | undefined) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showCanvasModal, setShowCanvasModal] = useState(!canvasId);
  const navigate = useNavigate();

  const { setBackgroundColor, setDimensions } = useCanvasStore();
  const { reset: resetShapes } = useShapeStore();

  useEffect(() => {
    const loadCanvas = async () => {
      if (!canvasId) return;

      try {
        const canvas = await canvasService.getCanvas(canvasId);
        setDimensions(canvas.width, canvas.height);
        setBackgroundColor(canvas.background_color);
      } catch (error) {
        console.error("요청 실패", error);
        navigate("/editor");
      } finally {
        setIsLoading(false);
      }
    };

    loadCanvas();
  }, [canvasId, navigate, setBackgroundColor, setDimensions]);

  const handleCreateCanvas = async (
    width: number,
    height: number,
    backgroundColor: string
  ) => {
    const newCanvasId = nanoid(10);

    try {
      await canvasService.createCanvas({
        id: newCanvasId,
        width,
        height,
        background_color: backgroundColor,
      });

      navigate(`/editor/${newCanvasId}`);
      setShowCanvasModal(false);
      setDimensions(width, height);
      setBackgroundColor(backgroundColor);
    } catch (error) {
      console.error("Failed to create canvas:", error);
    }
  };

  const handleChangeBackgroundColor = async (color: string) => {
    if (!canvasId) return;

    try {
      await canvasService.updateBackgroundColor(canvasId, color);
      setBackgroundColor(color);
      realtimeManager.broadcastCanvas({
        type: "updateBackground",
        backgroundColor: color,
      });
    } catch (error) {
      console.error("Failed to update background color:", error);
    }
  };

  const handleResetCanvas = () => {
    resetShapes();
    setShowCanvasModal(true);
    setDimensions(0, 0);
    setBackgroundColor("#FFFFFF");
  };

  return {
    isLoading,
    showCanvasModal,
    setShowCanvasModal,
    handleCreateCanvas,
    handleChangeBackgroundColor,
    handleResetCanvas,
  };
};
