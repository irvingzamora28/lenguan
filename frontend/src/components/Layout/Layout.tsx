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
      return storedAsideOpen !== null ? JSON.parse(storedAsideOpen) : false;
    });

    useEffect(() => {
      localStorage.setItem("asideOpen", JSON.stringify(asideOpen));
    }, [asideOpen]);

    const memoizedSetProfileOpen = useCallback((open: boolean) => {
      setProfileOpen(open);    }, []);

    const memoizedSetAsideOpen = useCallback((open: boolean) => {
        setAsideOpen(open);
    		localStorage.setItem("asideOpen", JSON.stringify(open));
    }, []);

    return (
      <main className="min-h-screen w-full bg-background text-maintext">
        <Navbar
          asideOpen={asideOpen}
          setAsideOpen={memoizedSetAsideOpen}
          profileOpen={profileOpen}
          setProfileOpen={memoizedSetProfileOpen}
        />
        <div className="flex dark:bg-slate-900 dark:text-slate-200">
          {asideOpen && <SidebarMenu closeSidebar={() => memoizedSetAsideOpen(false)} />}
          <div className="container mx-auto px-4 py-16 max-h-screen md:max-h-none overflow-y-auto" id="layout-content">
            {children}
          </div>
        </div>
      </main>
    );
  });

  export default Layout;
