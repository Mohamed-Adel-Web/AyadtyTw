"use client";

import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";
import { useState } from "react";
import useUser from "@/customHooks/loginHooks/useUser";
import { Links } from "@/app/[locale]/(Dashboard)/Dashboard/links";
import { Link } from "@/i18n/routing";

const Sidebar = () => {
  const { user, role } = useUser();

  const currentPath = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-20 flex flex-col border-r bg-[#F7F7F9] overflow-auto transition-all duration-300 ${
        isHovered ? "w-64" : "w-16"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ transition: "width 0.3s ease" }}
    >
      <div className="flex items-center justify-between px-4 py-2">
        {isHovered && (
          <span className="font-semibold text-[#666CFF]">Menu</span>
        )}
      </div>
      <nav className="flex flex-col items-start gap-4 px-2 py-5">
        <TooltipProvider>
          {Links(role).map((link) => (
            <Tooltip key={link.href}>
              <TooltipTrigger asChild>
                {link.permission ? (
                  <Link
                    href={link.href}
                    className={`flex items-center justify-start rounded-lg transition-colors ${
                      currentPath === link.href
                        ? "text-white bg-[#666CFF]"
                        : "text-black hover:bg-[#666CFF] hover:text-white"
                    } w-full px-2 py-2`}
                  >
                    <div className="flex items-center m-">
                      {link.icon}
                      {isHovered && <span className="mx-4">{link.label}</span>}
                    </div>
                  </Link>
                ) : (
                  ""
                )}
              </TooltipTrigger>
              {!isHovered && (
                <TooltipContent side="right">
                  <span className="text-sm">{link.label}</span>
                </TooltipContent>
              )}
            </Tooltip>
          ))}
        </TooltipProvider>
      </nav>
    </aside>
  );
};

export default Sidebar;
