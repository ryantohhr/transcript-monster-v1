"use server";

import Image from "next/image";
import { Avatar } from "@/components/ui/avatar";
import { createClient } from "@/lib/supabase/server";

export default async function NavUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
      <Avatar className="h-8 w-8 rounded-lg grayscale">
        <Image
          src={user?.user_metadata.avatar_url}
          width={35}
          height={35}
          alt={user?.user_metadata.full_name}
        />{" "}
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">
          {user?.user_metadata.full_name}
        </span>
        <span className="text-muted-foreground truncate text-xs">
          {user?.user_metadata.email}
        </span>
      </div>
    </div>
  );
}
