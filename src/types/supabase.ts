import { Shape } from "./shape";

export interface Canvas {
  id: string;
  created_at: string;
  title: string | null;
  width: number;
  height: number;
  background_color: string;
}

export interface ShapeRecord {
  id: string;
  canvas_id: string;
  created_at: string;
  shape_data: Shape;
  deleted_at: string | null;
}
