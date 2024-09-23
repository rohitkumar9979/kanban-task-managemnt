import Link from "next/link";

export default function Home() {
  return (
    <main className="h-full bg-[#F4F7FD] grid grid-cols-[280px_minmax(900px,_1fr)] relative">
      <Link href={"/dashboard"}>
        <h1>Tankban task management</h1>
      </Link>
    </main>
  );
}
