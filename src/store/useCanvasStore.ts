import { create } from "zustand";

interface CanvasState {
  backgroundColor: string;
  width?: number;
  height?: number;
  setBackgroundColor: (color: string) => void;
  setDimensions: (width: number, height: number) => void;

  // 새 캔버스 생성 관련
  newCanvas: {
    width: number;
    height: number;
    backgroundColor: string;
  };
  setNewCanvasWidth: (width: number) => void;
  setNewCanvasHeight: (height: number) => void;
  setNewCanvasBackgroundColor: (color: string) => void;
  reset: () => void;
}

export const useCanvasStore = create<CanvasState>((set) => ({
  backgroundColor: "#FFFFFF",
  width: undefined,
  height: undefined,

  setBackgroundColor: (color: string) => set({ backgroundColor: color }),
  setDimensions: (width: number, height: number) => set({ width, height }),

  newCanvas: {
    width: 600,
    height: 600,
    backgroundColor: "#FFFFFF",
  },

  setNewCanvasWidth: (width: number) =>
    set((state) => ({
      newCanvas: { ...state.newCanvas, width },
    })),

  setNewCanvasHeight: (height: number) =>
    set((state) => ({
      newCanvas: { ...state.newCanvas, height },
    })),

  setNewCanvasBackgroundColor: (backgroundColor: string) =>
    set((state) => ({
      newCanvas: { ...state.newCanvas, backgroundColor },
    })),

  reset: () =>
    set({
      backgroundColor: "#FFFFFF",
      width: undefined,
      height: undefined,
    }),
}));
