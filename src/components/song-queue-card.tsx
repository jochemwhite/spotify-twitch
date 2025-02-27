import React from "react";
import { Music2 } from "lucide-react";
import { Avatar } from "./ui/avatar";

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

export const SongQueueCard = ({ SongNotification }: { SongNotification: SongNotificationType }) => {

  return (
    <div className="w-[500px] bg-background rounded-xl p-4 flex items-center gap-3 shadow-sm hover:bg-gray-50 transition-colors">
      <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
        <Avatar className="h-16 w-16 rounded-md">
          {SongNotification.album_img ? (
            <img src={SongNotification.album_img} alt={`${SongNotification.song_name} album art`} className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-secondary">
              <Music2 className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
        </Avatar>
      </div>

      <div className="flex-1 min-w-0 ml-2">
        <div className="flex items-center gap-2 relative">
          <h3 className="font-medium text-white truncate max-w-48">{SongNotification.song_name}</h3>
          <span className="text-sm text-gray-500 absolute top-0 right-0">{SongNotification.chatter_name}</span>
        </div>
        <p className="text-sm text-gray-600 truncate">{SongNotification.artists}</p>
      </div>
    </div>
  );
};
