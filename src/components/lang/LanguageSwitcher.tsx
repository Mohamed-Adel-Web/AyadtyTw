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
        <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
          <Globe className="h-4 w-4 text-white" />
          <span className="sr-only">Language Switcher</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="space-y-5">
        <DropdownMenuItem
          className={`${locale === "en" ? "bg-[#7614B3] text-white" : ""}`}
          onClick={() => changeLocale("en")}
        >
          <Link
            href={`/?${searchParams.toString()}`}
            locale="en"
            className="block w-full h-full"
          >
            ENGLISH
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`${locale === "ar" ? "bg-[#7614B3] text-white" : ""}`}
          onClick={() => changeLocale("ar")}
        >
          <Link
            href={`/?${searchParams.toString()}`}
            locale="ar"
            className="block w-full h-full"
          >
            عربي
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
