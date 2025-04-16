
import { useState } from "react";
import { Menu, X, Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";

interface NavbarProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Navbar = ({ onToggleSidebar, isSidebarOpen }: NavbarProps) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center gap-2 md:gap-4 lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <Sidebar />
            </SheetContent>
          </Sheet>
          <div className="lg:hidden">
            <img 
              src="/eveytrans-logo.png" 
              alt="EveyTrans Logo" 
              className="h-8 w-auto" 
            />
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggleSidebar}
          className="hidden lg:flex"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>

        <div className="ml-auto flex items-center gap-4">
          <div className="hidden md:flex relative rounded-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-64 pl-8 bg-background"
            />
          </div>
          
          <Button variant="outline" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
            <span className="text-xs font-medium">AD</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
