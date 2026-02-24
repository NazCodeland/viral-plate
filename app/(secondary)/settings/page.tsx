"use client";
// app/(secondary)/settings/page.tsx

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { useRef, useState } from "react";
import PageHeader from "@/components/PageHeader";

const DEFAULT_USER = {
  name: "Alex Carter",
  username: "@alexcarter",
  avatar:
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop",
};

export default function SettingsPage() {
  const [avatar, setAvatar] = useState(DEFAULT_USER.avatar);
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  };

  const handleSave = () => {
    if (preview) {
      setAvatar(preview);
      setPreview(null);
    }
  };

  const displayAvatar = preview ?? avatar;

  return (
    <>
      <PageHeader title="Settings" />
      <div className="p-4">
        <div className="flex flex-col items-center pt-6 pb-8">
          <div className="relative mb-5">
            <Avatar className="size-28 ring-4 ring-background shadow-lg">
              <AvatarImage
                src={displayAvatar}
                alt="Profile"
                className="object-cover"
              />
              <AvatarFallback className="text-2xl font-semibold bg-green-500/10 text-green-700">
                {DEFAULT_USER.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <button
              onClick={() => fileRef.current?.click()}
              className="absolute bottom-0 right-0 size-9 rounded-full bg-green-500 hover:bg-green-600 active:scale-95 transition-all shadow-md flex items-center justify-center"
            >
              <Camera className="size-4 text-white" />
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          <h2 className="text-xl font-semibold text-foreground tracking-tight">
            {DEFAULT_USER.name}
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            {DEFAULT_USER.username}
          </p>

          {preview && (
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setPreview(null)}
                className="px-5 py-2 rounded-xl text-sm font-semibold text-muted-foreground border border-border hover:bg-muted transition-colors"
              >
                Discard
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-green-500 hover:bg-green-600 active:scale-95 transition-all shadow-sm"
              >
                Save photo
              </button>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-border shadow-sm overflow-hidden bg-card">
          <div className="flex items-center justify-between px-4 py-4 border-b border-border">
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">
                Display name
              </p>
              <p className="text-sm font-medium text-card-foreground">
                {DEFAULT_USER.name}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between px-4 py-4">
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Username</p>
              <p className="text-sm font-medium text-card-foreground">
                {DEFAULT_USER.username}
              </p>
            </div>
          </div>
        </div>

        <p className="text-xs text-center text-muted-foreground mt-6">
          More settings coming soon
        </p>
      </div>
    </>
  );
}
