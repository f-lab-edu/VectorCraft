import { create } from "zustand";
import { Shape } from "@/types/shape";
import { MouseState, Point } from "@/types/mouse";
import { nanoid } from "nanoid";

interface ShapeState {
  shapes: Shape[];
  selectedShapeId: string | null;
  mouse: MouseState;
  drag: {
    isDragging: boolean;
    startPoint: Point | null;
    offset: Point | null;
  };
  resize: {
    isResizing: boolean;
    handle: string | null;
    startPoint: Point | null;
    initialShape: Shape | null;
  };

  addShape: (shape: Shape) => void;
  updateShape: <T extends Shape>(
    id: string,
    updates: Partial<Omit<T, "id" | "type">>
  ) => void;
  deleteShape: (id: string) => void;
  selectShape: (id: string | null) => void;

  startDrawing: (point: Point) => void;
  updateDrawing: (point: Point) => void;
  endDrawing: () => void;

  startDragging: (point: Point, offset: Point) => void;
  updateDragging: (point: Point) => void;
  endDragging: () => void;

  startResize: (handle: string, point: Point, shape: Shape) => void;
  updateResize: (point: Point) => void;
  endResize: () => void;

  reset: () => void;
}

export const useShapeStore = create<ShapeState>((set) => ({
  // ... 기존 shape 관련 코드를 여기로 이동
  shapes: [],
  selectedShapeId: null,
  mouse: {
    isDrawing: false,
    startPoint: null,
    endPoint: null,
  },
  drag: {
    isDragging: false,
    startPoint: null,
    offset: null,
  },
  resize: {
    isResizing: false,
    handle: null,
    startPoint: null,
    initialShape: null,
  },

  addShape: (shape) =>
    set((state) => ({
      shapes: [...state.shapes, { ...shape, id: shape.id || nanoid() }],
    })),

  updateShape: (id, updates) =>
    set((state) => ({
      shapes: state.shapes.map((shape) =>
        shape.id === id ? { ...shape, ...updates } : shape
      ),
    })),

  deleteShape: (id) =>
    set((state) => ({
      shapes: state.shapes.filter((shape) => shape.id !== id),
      selectedShapeId:
        state.selectedShapeId === id ? null : state.selectedShapeId,
    })),

  selectShape: (id) => set({ selectedShapeId: id }),

  startDrawing: (point) =>
    set({
      mouse: {
        isDrawing: true,
        startPoint: point,
        endPoint: point,
      },
    }),

  updateDrawing: (point) =>
    set((state) => ({
      mouse: {
        ...state.mouse,
        endPoint: point,
      },
    })),

  endDrawing: () =>
    set({
      mouse: {
        isDrawing: false,
        startPoint: null,
        endPoint: null,
      },
    }),

  startDragging: (point, offset) =>
    set({
      drag: {
        isDragging: true,
        startPoint: point,
        offset,
      },
    }),

  updateDragging: (point) =>
    set((state) => {
      if (
        !state.drag.isDragging ||
        !state.drag.startPoint ||
        !state.drag.offset ||
        !state.selectedShapeId
      ) {
        return state;
      }

      const dx = point.x - state.drag.startPoint.x;
      const dy = point.y - state.drag.startPoint.y;
      const offset = state.drag.offset;

      return {
        shapes: state.shapes.map((shape) =>
          shape.id === state.selectedShapeId
            ? {
                ...shape,
                x: offset.x + dx,
                y: offset.y + dy,
              }
            : shape
        ),
      };
    }),

  endDragging: () =>
    set({
      drag: {
        isDragging: false,
        startPoint: null,
        offset: null,
      },
    }),

  startResize: (handle, point, shape) =>
    set({
      resize: {
        isResizing: true,
        handle,
        startPoint: point,
        initialShape: shape,
      },
    }),

  updateResize: (point) =>
    set((state) => {
      if (
        !state.resize.isResizing ||
        !state.resize.startPoint ||
        !state.resize.initialShape ||
        !state.selectedShapeId ||
        !state.resize.handle
      ) {
        return state;
      }

      const dx = point.x - state.resize.startPoint.x;
      const dy = point.y - state.resize.startPoint.y;
      const initialShape = state.resize.initialShape;
      const handle = state.resize.handle;

      return {
        shapes: state.shapes.map((shape) => {
          if (shape.id !== state.selectedShapeId) return shape;

          if (shape.type === "rectangle" && initialShape.type === "rectangle") {
            let width = initialShape.width;
            let height = initialShape.height;
            let x = initialShape.x;
            let y = initialShape.y;

            switch (handle) {
              case "se":
                width = Math.max(10, initialShape.width + dx);
                height = Math.max(10, initialShape.height + dy);
                break;
              case "sw":
                width = Math.max(10, initialShape.width - dx);
                height = Math.max(10, initialShape.height + dy);
                x = initialShape.x + dx;
                break;
              case "ne":
                width = Math.max(10, initialShape.width + dx);
                height = Math.max(10, initialShape.height - dy);
                y = initialShape.y + dy;
                break;
              case "nw":
                width = Math.max(10, initialShape.width - dx);
                height = Math.max(10, initialShape.height - dy);
                x = initialShape.x + dx;
                y = initialShape.y + dy;
                break;
            }

            return { ...shape, x, y, width, height };
          }

          if (
            (shape.type === "circle" || shape.type === "polygon") &&
            initialShape.type === shape.type
          ) {
            const radius = Math.max(10, initialShape.radius + Math.max(dx, dy));
            return { ...shape, radius };
          }

          return shape;
        }),
      };
    }),

  endResize: () =>
    set({
      resize: {
        isResizing: false,
        handle: null,
        startPoint: null,
        initialShape: null,
      },
    }),

  reset: () =>
    set({
      shapes: [],
      selectedShapeId: null,
      mouse: {
        isDrawing: false,
        startPoint: null,
        endPoint: null,
      },
      drag: {
        isDragging: false,
        startPoint: null,
        offset: null,
      },
      resize: {
        isResizing: false,
        handle: null,
        startPoint: null,
        initialShape: null,
      },
    }),
}));
