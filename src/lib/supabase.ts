import { createClient, RealtimeChannel } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

let channel: RealtimeChannel;

export const initializeRealtimeClient = (canvasId: string) => {
  if (channel) {
    channel.unsubscribe();
  }

  channel = supabase.channel(`canvas:${canvasId}`, {
    config: {
      broadcast: {
        self: true,
      },
    },
  });

  return channel;
};

export const getRealtimeChannel = () => channel;
