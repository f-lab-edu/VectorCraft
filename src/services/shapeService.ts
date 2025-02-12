import { supabase } from "@/lib/supabase";
import { Shape } from "@/types/shape";

interface CreateShapeData {
  id: string;
  canvas_id: string;
  shape_data: Shape;
}

interface UpdateShapeData {
  shape_data: Shape;
}

export const shapeService = {
  async getShapes(canvasId: string) {
    const { data: shapes, error } = await supabase
      .from("shapes")
      .select("*")
      .eq("canvas_id", canvasId)
      .is("deleted_at", null);

    if (error) {
      throw error;
    }

    return shapes.map((shape) => ({
      ...shape.shape_data,
      id: shape.id,
    }));
  },

  async createShape(canvasId: string, shape: Shape) {
    const data: CreateShapeData = {
      id: shape.id,
      canvas_id: canvasId,
      shape_data: shape,
    };

    const { error } = await supabase.from("shapes").insert(data);

    if (error) {
      throw error;
    }
  },

  async updateShape(shapeId: string, shape: Shape) {
    const data: UpdateShapeData = {
      shape_data: shape,
    };

    const { error } = await supabase
      .from("shapes")
      .update(data)
      .eq("id", shapeId)
      .is("deleted_at", null);

    if (error) {
      throw error;
    }
  },

  async deleteShape(shapeId: string) {
    const { error } = await supabase
      .from("shapes")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", shapeId);

    if (error) {
      throw error;
    }
  },
};
