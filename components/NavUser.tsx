"use client";

import Image from "next/image";
import { use } from "react";
import { Avatar } from "@/components/ui/avatar";
import { UserContext } from "@/contexts/UserContext";

export default function NavUser() {
  const user = use(UserContext);

  if (!user) return null;

  return (
    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
      <Avatar className="h-8 w-8 rounded-lg grayscale">
        <Image
          src={user.avatar_url}
          width={35}
          height={35}
          alt={user.name}
        />{" "}
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{user.name}</span>
        <span className="text-muted-foreground truncate text-xs">
          {user.email}
        </span>
      </div>
    </div>
  );
}
