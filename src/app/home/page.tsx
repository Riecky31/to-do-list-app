"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { JSX, MouseEvent } from "react";

export default function Home(): JSX.Element {
  const router = useRouter();

  function logout(event: MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    router.push("/");
  }

  return (
    <nav className="w-full bg-gray-100 px-6 py-4">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <ul className="flex gap-8 text-gray-800 font-medium">
          <li><Link href="/interns" className="hover:text-blue-600 transition-colors duration-200 cursor-pointer">Interns</Link></li>
          <li><Link href="/programModules" className="hover:text-blue-600 transition-colors duration-200 cursor-pointer">Program Modules</Link></li>
          <li><Link href="/programs" className="hover:text-blue-600 transition-colors duration-200 cursor-pointer">Programs</Link></li>
        </ul>
        <button
          onClick={logout}
          className="text-red-600 hover:underline font-medium"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
