import { Navbar } from "../components/Navbar";
import { SideNav } from "../components/SideNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full bg-[#F4F7FD] grid grid-cols-[280px_minmax(900px,_1fr)] relative">
      <Navbar />
      <SideNav />
      <div>{children}</div>
    </div>
  );
}
