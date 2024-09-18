import Navbar from "@/components/clinicSite/navbar/NavbarLayout";

export default function clinicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <Navbar/>
      <div className="container my-2 ">{children}</div>
    </>
  );
}
