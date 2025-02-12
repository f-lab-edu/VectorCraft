import { create } from "zustand";
import { ToolType, ToolSettings } from "@/types/components/tools";

interface ToolState {
  selectedTool: ToolType;
  toolSettings: ToolSettings;
  setSelectedTool: (tool: ToolType) => void;
  updateToolSettings: <T extends keyof ToolSettings>(
    tool: T,
    settings: Partial<ToolSettings[T]>
  ) => void;
}

export const useToolStore = create<ToolState>((set) => ({
  selectedTool: "cursor",
  toolSettings: {
    rectangle: {
      width: 100,
      height: 100,
      fill: "#000000",
      stroke: "#000000",
      strokeWidth: 1,
      borderRadius: 0,
    },
    circle: {
      radius: 50,
      fill: "#000000",
      stroke: "#000000",
      strokeWidth: 1,
    },
    polygon: {
      radius: 50,
      sides: 3,
      fill: "#000000",
      stroke: "#000000",
      strokeWidth: 1,
    },
  },

  setSelectedTool: (tool) => set({ selectedTool: tool }),

  updateToolSettings: (tool, settings) =>
    set((state) => ({
      toolSettings: {
        ...state.toolSettings,
        [tool]: {
          ...state.toolSettings[tool],
          ...settings,
        },
      },
    })),
}));
