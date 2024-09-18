import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { getMessages } from "next-intl/server";
import {NextIntlClientProvider} from 'next-intl';
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale}  dir={locale == "en" ? "ltr" : "rtl"} suppressHydrationWarning>
      <head />

      <body
        className={cn(
          "min-h-screen bg-gray-100 font-sans antialiased",
          fontSans.variable
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <main>{children}</main>
          <Toaster />
        </NextIntlClientProvider>

        <Toaster />
      </body>
    </html>
  );
}
