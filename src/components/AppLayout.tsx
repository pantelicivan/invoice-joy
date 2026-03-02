import { Link, useLocation } from "react-router-dom";
import { FileText, Settings, Plus, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import jakiLogo from "@/assets/jaki-logo.jpg";

const navItems = [
  { to: "/", label: "Fakture", icon: LayoutDashboard },
  { to: "/nova-faktura", label: "Nova faktura", icon: Plus },
  { to: "/usluge", label: "Usluge", icon: FileText },
  { to: "/podesavanja", label: "Podešavanja", icon: Settings },
];

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { signOut } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <nav className="no-print border-b bg-card invoice-shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-1">
              <img src={jakiLogo} alt="Jaki Reifenservice" className="h-10 mr-3 rounded" />
              <span className="font-semibold text-lg hidden sm:block">Jaki Reifenservice</span>
              <div className="flex items-center gap-1 ml-4 sm:ml-8">
                {navItems.map((item) => (
                  <Link key={item.to} to={item.to}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "gap-2 text-muted-foreground",
                        location.pathname === item.to && "bg-secondary text-foreground"
                      )}
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="hidden md:inline">{item.label}</span>
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={signOut} className="gap-2 text-muted-foreground">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Odjavi se</span>
            </Button>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
