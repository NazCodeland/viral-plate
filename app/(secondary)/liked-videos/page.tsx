"use client";
// app/(secondary)/liked-videos/page.tsx

import { Heart, Play } from "lucide-react";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";

const likedVideos = [
  {
    id: 1,
    title: "Green Goddess Salad",
    creator: "@BakedByMel",
    views: "2.1M",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=400&fit=crop",
    duration: "0:45",
  },
  {
    id: 2,
    title: "Crispy Tofu Bowl",
    creator: "@VeganVibes",
    views: "890K",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=400&fit=crop",
    duration: "1:02",
  },
  {
    id: 3,
    title: "Spicy Ramen at Home",
    creator: "@NoodleNation",
    views: "4.5M",
    image:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=400&fit=crop",
    duration: "2:15",
  },
  {
    id: 4,
    title: "Dragon Roll Secrets",
    creator: "@SushiMaster",
    views: "1.2M",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300&h=400&fit=crop",
    duration: "3:30",
  },
  {
    id: 5,
    title: "Perfect Carbonara",
    creator: "@RomaCuisine",
    views: "6.7M",
    image:
      "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=300&h=400&fit=crop",
    duration: "1:48",
  },
  {
    id: 6,
    title: "BBQ Ribs Masterclass",
    creator: "@GrillKing",
    views: "3.3M",
    image:
      "https://images.unsplash.com/photo-1544025162-d76594e18be2?w=300&h=400&fit=crop",
    duration: "4:12",
  },
  {
    id: 7,
    title: "Avocado Toast 10 Ways",
    creator: "@BrunchBoss",
    views: "5.0M",
    image:
      "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=300&h=400&fit=crop",
    duration: "2:55",
  },
  {
    id: 8,
    title: "Mango Sticky Rice",
    creator: "@ThaiTable",
    views: "780K",
    image:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=400&fit=crop",
    duration: "1:20",
  },
];

export default function LikedVideosPage() {
  return (
    <>
      <PageHeader title="Liked Videos" />
      <div className="grid grid-cols-2 gap-0.5 p-0.5">
        {likedVideos.map((video) => (
          <VideoTile key={video.id} video={video} />
        ))}
      </div>
    </>
  );
}

function VideoTile({ video }: { video: (typeof likedVideos)[0] }) {
  return (
    <div className="relative aspect-3/4 overflow-hidden rounded-sm group cursor-pointer">
      {" "}
      <Image
        src={video.image}
        alt={video.title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="size-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <Play className="size-5 text-white fill-white ml-0.5" />
        </div>
      </div>
      <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm rounded px-1.5 py-0.5">
        <span className="text-xs text-white font-medium">{video.duration}</span>
      </div>
      <div className="absolute top-2 left-2">
        <Heart className="size-4 fill-red-500 text-red-500 drop-shadow" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-2">
        <p className="text-white text-xs font-semibold leading-tight line-clamp-2">
          {video.title}
        </p>
        <p className="text-white/60 text-xs mt-0.5">{video.creator}</p>
        <p className="text-white/40 text-xs">{video.views} views</p>
      </div>
    </div>
  );
}
