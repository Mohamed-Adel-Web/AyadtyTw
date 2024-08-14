import ClinicNavBar from "@/components/clinicSite/clinicNavBar";

export default function clinicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <ClinicNavBar/>
      <div className="container-xl">{children}</div>
    </>
  );
}
