"use client";

import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Music2 } from "lucide-react";
import SongQueueList from "@/components/song-queue-list";

interface SongData {
  song: string;
  artists: string[];
  duration: number;
  album_img: string;
  song_id: string;
}

export default function Page() {
  const [currentSong, setCurrentSong] = useState<SongData | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  const showSongNotification = (songData: SongData) => {
    setCurrentSong(songData);
    setShowNotification(true);

    // Hide notification after 5 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };

  useEffect(() => {
    const channelA = supabase.channel("jochemwhite");

    channelA.on("broadcast", { event: "new_song" }, (payload) => showSongNotification(payload.payload as SongData)).subscribe();
  }, []);

  return (
    <>
      <SongNotification data={currentSong} isVisible={showNotification} />
      <SongQueueList />
    </>
  );
}

function SongNotification({ data, isVisible }: { data: SongData | null; isVisible: boolean }) {
  if (!data) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="fixed top-4 right-4 z-50"
        >
          <Card className="w-80 bg-[#191414] backdrop-blur-md text-white border-none">
            <div className="flex items-start space-x-4 p-4">
              <Avatar className="h-16 w-16 rounded-md">
                {data.album_img ? (
                  <img src={data.album_img} alt={`${data.song} album art`} className="object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-secondary">
                    <Music2 className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
              </Avatar>
              <div className="flex-1 space-y-1">
                <h4 className="font-semibold leading-none tracking-tight text-white">{data.song}</h4>
                <p className="text-sm text-gray-400">{data.artists.join(", ")}</p>
                <div className="text-xs text-gray-400">Now Playing</div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
