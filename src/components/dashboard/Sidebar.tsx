import { cn } from "@/lib/utils";
import { 
  Bus, 
  HomeIcon, 
  LayoutDashboard, 
  Map, 
  Route, 
  Calendar, 
  Users, 
  Gauge, 
  Battery, 
  Laptop, 
  Settings,
  LogOut,
  Activity
} from "lucide-react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <aside className={cn("flex h-screen w-64 flex-col border-r border-border/40 bg-background", className)}>
      <div className="flex h-16 items-center border-b border-border/40 px-6">
        <div className="flex items-center gap-2">
          <Bus className="h-6 w-6 text-ev-blue" />
          <span className="text-xl font-semibold tracking-tight">EV Fleet</span>
        </div>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-4">
          <Link to="/" className={cn("nav-item", pathname === "/" && "active")}>
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <Link to="/depots" className={cn("nav-item", pathname === "/depots" && "active")}>
            <HomeIcon className="h-4 w-4" />
            Depots
          </Link>
          
          <div className="px-2 py-2">
            <h4 className="text-xs font-semibold text-muted-foreground mb-1">VEHICLE MANAGEMENT</h4>
          </div>
          <Link to="/vehicles" className={cn("nav-item", pathname === "/vehicles" && "active")}>
            <Bus className="h-4 w-4" />
            All Vehicles
          </Link>
          <Link to="/vehicles/live" className={cn("nav-item", pathname === "/vehicles/live" && "active")}>
            <Activity className="h-4 w-4" />
            Live Vehicles
          </Link>
          <Link to="/vehicles/history" className={cn("nav-item", pathname === "/vehicles/history" && "active")}>
            <Gauge className="h-4 w-4" />
            Vehicle History
          </Link>
          
          <div className="px-2 py-2">
            <h4 className="text-xs font-semibold text-muted-foreground mb-1">OPERATIONS</h4>
          </div>
          <Link to="/routes" className={cn("nav-item", pathname === "/routes" && "active")}>
            <Route className="h-4 w-4" />
            Routes
          </Link>
          <Link to="/schedules" className={cn("nav-item", pathname === "/schedules" && "active")}>
            <Calendar className="h-4 w-4" />
            Schedules
          </Link>
          <Link to="/devices" className={cn("nav-item", pathname === "/devices" && "active")}>
            <Laptop className="h-4 w-4" />
            Devices
          </Link>
          <Link to="/tracking" className={cn("nav-item", pathname === "/tracking" && "active")}>
            <Map className="h-4 w-4" />
            Live Tracking
          </Link>
          <Link to="/users" className={cn("nav-item", pathname === "/users" && "active")}>
            <Users className="h-4 w-4" />
            Users
          </Link>
          <Link to="/maintenance" className={cn("nav-item", pathname === "/maintenance" && "active")}>
            <Gauge className="h-4 w-4" />
            Maintenance
          </Link>
          <Link to="/battery" className={cn("nav-item", pathname === "/battery" && "active")}>
            <Battery className="h-4 w-4" />
            Battery Status
          </Link>
        </nav>
      </div>
      <div className="border-t border-border/40 px-4 py-4">
        <div className="grid gap-1">
          <Link to="/settings" className={cn("nav-item", pathname === "/settings" && "active")}>
            <Settings className="h-4 w-4" />
            Settings
          </Link>
          <button className="nav-item text-muted-foreground hover:text-destructive">
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
