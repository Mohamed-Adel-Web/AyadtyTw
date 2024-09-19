"use client";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const changeLocale = (newLocale: "ar" | "en") => {
    const newUrl = `${pathname}?${searchParams.toString()}`;
    router.replace(newUrl, { locale: newLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 px-0 bg-black text-white rounded-full hover:bg-black hover:text-white mx-3"
        >
          <Globe className="h-4 w-4" />
          <span className="sr-only">Language Switcher</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="space-y-1 bg-white rounded-md p-2 shadow-lg">
        <DropdownMenuItem
          className={`${
            locale === "en"
              ? "bg-[#7614B3] text-white"
              : "hover:bg-gray-100 hover:text-black"
          } rounded-md px-2 py-1 cursor-pointer`}
          onClick={() => changeLocale("en")}
        >
          ENGLISH
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`${
            locale === "ar"
              ? "bg-[#7614B3] text-white"
              : "hover:bg-gray-100 hover:text-black"
          } rounded-md px-2 py-1 cursor-pointer`}
          onClick={() => changeLocale("ar")}
        >
          عربي
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
