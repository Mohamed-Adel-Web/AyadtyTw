"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Globe } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { formatUrl } from "@/lib/utils";
import { Link } from "@/i18n/routing";
import LanguageSwitcher from "@/components/lang/LanguageSwitcher";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("clinicWebsite.links"); // Initialize next-intl translations
  const navItems = [
    { key: "home" },
    { key: "services" },
    { key: "medicalSpecialties" },
    { key: "ourArticles" },
    { key: "contact" },
    { key: "login" },
    { key: "register" },
  ].map((item) => ({
    name: t(item.key),
    href: `/clinic-website/${formatUrl(item.key)}`,
  }));

  return (
    <nav className="nav-background shadow-md py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Image
              src={"https://ayadty.com/logo.png"}
              width={100}
              height={100}
              alt="logo"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white  px-3 py-2 rounded-md text-lg font-bold "
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Language and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-4 mt-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-gray-700 hover:text-white duration-300 hover:bg-fuchsia-900 px-3 py-2 rounded-md text-sm font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
