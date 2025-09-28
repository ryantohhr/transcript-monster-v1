import AppHeader from "@/components/AppHeader";
import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { UserProvider } from "@/contexts/UserContext";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <SidebarProvider>
        <AppSidebar />
        <div className="flex flex-col w-full">
          <AppHeader />
          <main className="w-full h-full">{children}</main>
        </div>
      </SidebarProvider>
    </UserProvider>
  );
}
