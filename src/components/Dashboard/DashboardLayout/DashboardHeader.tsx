"use client";
import { useState } from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { PanelLeftIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { Links } from "@/app/[locale]/(Dashboard)/Dashboard/links";
import useUser from "@/customHooks/loginHooks/useUser";
import { Link, useRouter } from "@/i18n/routing";
import LanguageSwitcher from "@/components/lang/LanguageSwitcher";
import { useTranslations } from "next-intl"; 

const Header = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const currentPath = usePathname();
  const router = useRouter();
  const { user, role } = useUser();
  const t = useTranslations("Dashboard.header");

  const handleLinkClick = () => {
    setIsSheetOpen(false);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    router.push("/clinic-website/login");
  };

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 border-b bg-white shadow-md sm:px-6">
      {/* Mobile Menu Button */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className="sm:hidden text-[#5A5FE0] hover:bg-gray-100"
          >
            <PanelLeftIcon className="h-6 w-6" />
            <span className="sr-only">{t("toggle_menu")}</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="sm:max-w-xs bg-white shadow-lg overflow-auto"
        >
          <nav className="p-4 space-y-4">
            {Links(role).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-4 py-2 px-4 rounded-md ${
                  currentPath === link.href
                    ? "bg-[#5A5FE0] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={handleLinkClick}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Breadcrumb for Larger Screens */}
      <Breadcrumb className="hidden md:flex items-center space-x-2 text-[#5A5FE0]">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/Dashboard/MyProfile" prefetch={false}>
                {t("dashboard")}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {Links(role).find((link) => link.href === currentPath)?.label}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Language Switcher and User Menu */}
      <div className="flex items-center space-x-4">
        <LanguageSwitcher />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full border-[#5A5FE0] hover:border-[#4e4df7]"
            >
              <Image
                src="/next.svg"
                width={36}
                height={36}
                alt={t("avatar_alt")}
                className="rounded-full"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white shadow-lg rounded-md">
            <DropdownMenuLabel className="text-[#5A5FE0] font-semibold">
              {t("my_account")}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:bg-gray-100">
              <Link href={"/Dashboard/MyProfile"}>{t("settings")}</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="hover:bg-gray-100 cursor-pointer"
              onClick={handleLogout}
            >
              {t("logout")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
