"use client";

import { supabase } from "@/lib/supabase";
import { AnimatePresence, motion } from "framer-motion";
import { Music } from "lucide-react";
import { useEffect, useState } from "react";
import { SongQueueCard } from "./song-queue-card";

export interface SongNotificationType {
  album_img: string;
  artists: string;
  broadcaster_id: string;
  chatter_id: string;
  chatter_name: string;
  created_at: string;
  id: number;
  song_name: string;
  song_uri: string;
}

// Simplified songVariants (opacity only) - KEPT SIMPLE
const songVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

export default function SongQueueList() {
  const [queue, setQueue] = useState<SongNotificationType[]>([]);

  useEffect(() => {
    const channelA = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "jochemwhite",
        },
        (payload) => handleIncommingMessage(payload)
      )
      .subscribe();
    fetchQueue();
    return () => {
      supabase.removeChannel(channelA); // Unsubscribe on unmount
    };
  }, []);

  const fetchQueue = async () => {
    const { data, error } = await supabase.from("queue").select("*");

    if (error) {
      console.log(error);
      return;
    }

    if (data === null) return;

    console.log(data)

    setQueue(data);
  };

  const handleIncommingMessage = (payload: any) => {
    const songData: SongNotificationType = payload.new || payload.old;


    if (!songData) {
      console.log("Missing song data in payload");
      return;
    }

    setQueue((prevQueue) => {
      switch (payload.eventType) {
        case "INSERT":
          return [...prevQueue, songData];
        case "DELETE":
          return prevQueue.filter((item) => item.id !== payload.old.id);
        default:
          return prevQueue;
      }
    });
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 rounded-lg overflow-hidden ">
      <div className=" overflow-hidden">
        <AnimatePresence initial={false} mode="popLayout">
          {queue.slice(0 ,3).reverse().map((song) => {
            return (
              <motion.div
                key={song.id}
                layout
                variants={songVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{
                  layout: {
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  },
                }}
                className="flex items-center py-1 last:border-b-0"
              >
                <SongQueueCard SongNotification={song} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
