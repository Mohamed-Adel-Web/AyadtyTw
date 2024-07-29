"use client";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { SettingsIcon, MenuIcon, XIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LinkItem } from "@/types/linkItem";
interface SidebarProps {
  links: LinkItem[];
}
const Sidebar: React.FC<SidebarProps> = ({ links }) => {
  const currentPath = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-20 flex flex-col border-r bg-background transition-all duration-300 ${
          isOpen ? "w-64" : "w-20"
        } ${isOpen ? "block" : "hidden"} sm:block`}
      >
        <div className="flex items-center justify-between px-4 py-2">
          <button
            onClick={toggleSidebar}
            className="text-muted-foreground hover:text-foreground"
          >
            {isOpen ? (
              <XIcon className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </button>
          {isOpen && <span className="font-semibold">Menu</span>}
        </div>
        <nav className="flex flex-col items-center gap-4 px-2 py-5">
          <TooltipProvider>
            {links.map((link) => (
              <Tooltip key={link.href}>
                <TooltipTrigger asChild>
                  <Link
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    href={link.href}
                    className={`flex items-center justify-center rounded-lg transition-colors ${
                      currentPath === link.href
                        ? "text-white bg-black"
                        : "text-muted-foreground hover:text-foreground"
                    } w-full px-2 py-2`}
                  >
                    <div className="flex items-center">
                      {link.icon}
                      {isOpen && <span className="ml-2">{link.label}</span>}
                    </div>
                  </Link>
                </TooltipTrigger>
                {!isOpen && (
                  <TooltipContent side="right">{link.label}</TooltipContent>
                )}
              </Tooltip>
            ))}
          </TooltipProvider>
        </nav>
      </aside>
      <button
        onClick={toggleSidebar}
        className="fixed bottom-5 left-5 z-30 sm:hidden text-muted-foreground hover:text-foreground"
      >
        <MenuIcon className="h-8 w-8" />
      </button>
    </>
  );
};
export default Sidebar;
