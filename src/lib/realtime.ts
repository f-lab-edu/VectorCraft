import { supabase } from "./supabase";
import { RealtimeChannel } from "@supabase/supabase-js";
import { Shape } from "@/types/shape";
import { shapeService } from "@/services/shapeService";

type ShapeEvent = {
  type: "add" | "update" | "delete";
  shape?: Shape;
  shapeId?: string;
};

type CanvasEvent = {
  type: "updateBackground";
  backgroundColor: string;
};

class RealtimeManager {
  private channel: RealtimeChannel | null = null;

  async initialize(canvasId: string) {
    if (this.channel) {
      this.channel.unsubscribe();
    }

    try {
      // 도형 데이터 로드
      const shapes = await shapeService.getShapes(canvasId);

      // 채널 초기화
      this.channel = supabase.channel(`canvas:${canvasId}`, {
        config: {
          broadcast: { self: false },
        },
      });

      return {
        channel: this.channel,
        shapes,
      };
    } catch (error) {
      console.error("초기화 실패:", error);
      throw error;
    }
  }

  broadcastShape(event: ShapeEvent) {
    this.channel?.send({
      type: "broadcast",
      event: "shape",
      payload: event,
    });
  }

  broadcastCanvas(event: CanvasEvent) {
    this.channel?.send({
      type: "broadcast",
      event: "canvas",
      payload: event,
    });
  }

  getChannel() {
    return this.channel;
  }

  disconnect() {
    this.channel?.unsubscribe();
    this.channel = null;
  }
}

export const realtimeManager = new RealtimeManager();
