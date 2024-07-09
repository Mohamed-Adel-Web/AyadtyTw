import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatUrl } from "@/lib/utils";
import { Menu, Mountain } from "lucide-react";

export default function ClinicNavBar() {
  const navData = [
    { en: "home", ar: "الرئيسية" },
    { en: "services", ar: "خدماتنا" },
    { en: "medical specialties", ar: "التخصصات الطبية" },
    { en: "our articles", ar: "مقالاتنا" },
    { en: "contact", ar: "تواصل معنا" },
    { en: "login", ar: "تسجيل الدخول" },
    { en: "register", ar: "تسجيل" },
  ];

  const navItemsLarge = navData.map((item) => (
    <Link
      key={item.en}
      href={`/${formatUrl(item.en)}`}
      className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors capitalize hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
    >
      {item.en}
    </Link>
  ));

  const navItemsSmall = navData.map((item) => (
    <Link
      key={item.en}
      href={`/${formatUrl(item.en)}`}
      className="flex w-full items-center py-2 text-lg font-semibold capitalize"
    >
      {item.en}
    </Link>
  ));

  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
            <Mountain className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <div className="grid gap-2 py-6">{navItemsSmall}</div>
        </SheetContent>
      </Sheet>
      <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
        <Mountain className="h-6 w-6" />
        <span className="sr-only">Acme Inc</span>
      </Link>
      <nav className="ml-auto hidden lg:flex gap-6">{navItemsLarge}</nav>
    </header>
  );
}
