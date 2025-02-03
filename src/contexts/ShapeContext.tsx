import { createContext, useContext, useReducer } from "react";
import { Shape } from "@/types/shape";
import { nanoid } from "nanoid";

interface ShapeState {
  shapes: Shape[];
  selectedShapeId: string | null;
}

type ShapeAction =
  | { type: "ADD_SHAPE"; payload: Omit<Shape, "id"> }
  | { type: "UPDATE_SHAPE"; payload: Shape }
  | { type: "DELETE_SHAPE"; payload: string }
  | { type: "SELECT_SHAPE"; payload: string | null };

const initialState: ShapeState = {
  shapes: [],
  selectedShapeId: null,
};

const shapeReducer = (state: ShapeState, action: ShapeAction): ShapeState => {
  switch (action.type) {
    case "ADD_SHAPE":
      return {
        ...state,
        shapes: [...state.shapes, { ...action.payload, id: nanoid() } as Shape],
      };

    case "UPDATE_SHAPE":
      return {
        ...state,
        shapes: state.shapes.map((shape) =>
          shape.id === action.payload.id ? action.payload : shape
        ),
      };

    case "DELETE_SHAPE":
      return {
        ...state,
        shapes: state.shapes.filter((shape) => shape.id !== action.payload),
        selectedShapeId:
          state.selectedShapeId === action.payload
            ? null
            : state.selectedShapeId,
      };

    case "SELECT_SHAPE":
      return {
        ...state,
        selectedShapeId: action.payload,
        shapes: state.shapes.map((shape) => ({
          ...shape,
          isSelected: shape.id === action.payload,
        })),
      };

    default:
      return state;
  }
};

interface ShapeContextType extends ShapeState {
  addShape: (shape: Omit<Shape, "id">) => void;
  updateShape: (shape: Shape) => void;
  deleteShape: (id: string) => void;
  selectShape: (id: string | null) => void;
}

const ShapeContext = createContext<ShapeContextType | null>(null);

export const ShapeProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(shapeReducer, initialState);

  const value: ShapeContextType = {
    shapes: state.shapes,
    selectedShapeId: state.selectedShapeId,
    addShape: (shape) => dispatch({ type: "ADD_SHAPE", payload: shape }),
    updateShape: (shape) => dispatch({ type: "UPDATE_SHAPE", payload: shape }),
    deleteShape: (id) => dispatch({ type: "DELETE_SHAPE", payload: id }),
    selectShape: (id) => dispatch({ type: "SELECT_SHAPE", payload: id }),
  };

  return (
    <ShapeContext.Provider value={value}>{children}</ShapeContext.Provider>
  );
};

export const useShapes = () => {
  const context = useContext(ShapeContext);
  if (!context) {
    throw new Error("useShapes must be used within a ShapeProvider");
  }
  return context;
};
