

"use client";
import Link from "next/link"

import { useRouter } from "next/navigation";

export default function Home() {
  const { push } = useRouter();
  function logout() {
    push("/");
  }
  return (
    <div>
      <nav style={{ width: "100%" }}>
        <ul className="flex gap-8">
        <li>
            <Link href="interns">Interns</Link>
            </li>
          <li>Contact</li>
          <li>About</li>
        </ul>
        <li onClick={logout} className="logout-button float-right">
          Logout
        </li>
      </nav>
    </div>
  );
}
