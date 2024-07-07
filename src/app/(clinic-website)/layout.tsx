
import ClinicNavBar from "@/components/clinicNavBar";



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
