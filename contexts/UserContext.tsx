"use client";

import { createContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type User = {
  name: string;
  email: string;
  avatar_url: string;
};

export const UserContext = createContext<User | null>(null);

export function UserProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return null;
      setUser({
        name: user.user_metadata.full_name,
        email: user.user_metadata.email,
        avatar_url: user.user_metadata.avatar_url,
      });
    }

    fetchUser();
  }, []);

  return <UserContext value={user}>{children}</UserContext>;
}
