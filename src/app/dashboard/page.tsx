import Link from "next/link";

export default function Dashboard() {
  return (
    <Link href={"/dashboard"}>
      <h1 style={{ textAlign: "center" }}>Kanban task management</h1>
    </Link>
  );
}
