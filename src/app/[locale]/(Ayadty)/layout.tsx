import NavBar from "@/components/Ayadty/navbar/NavbarLayout";

export default function AyadtyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
        <div className="container">{children}</div>
    </>
  );
}
