import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../Items/Navbar/Navbar";
import SidebarMenu from "../Items/Menu/SidebarMenu";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = React.memo<LayoutProps>(({ children }) => {
    const [profileOpen, setProfileOpen] = useState(false);
    const [asideOpen, setAsideOpen] = useState(() => {
      const storedAsideOpen = localStorage.getItem("asideOpen");
      return storedAsideOpen ? JSON.parse(storedAsideOpen) : true;
    });

    useEffect(() => {
      localStorage.setItem("asideOpen", JSON.stringify(asideOpen));
    }, [asideOpen]);

    const memoizedSetProfileOpen = useCallback((open: boolean) => {
      setProfileOpen(open);    }, []);

    const memoizedSetAsideOpen = useCallback((open: boolean) => {
      setAsideOpen(open);
    }, []);

    return (
      <main className="min-h-screen w-full bg-background text-maintext">
        <Navbar
          asideOpen={asideOpen}
          setAsideOpen={memoizedSetAsideOpen}
          profileOpen={profileOpen}
          setProfileOpen={memoizedSetProfileOpen}
        />
        <div className="flex">
          {asideOpen && <SidebarMenu />}
          <div className="container mx-auto px-4 py-16 max-h-screen md:max-h-none overflow-y-auto">
            {children}
          </div>
        </div>
      </main>
    );
  });

  export default Layout;
