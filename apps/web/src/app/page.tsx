import Image from "next/image";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import SignOutButton from "@/components/auth/SignOutButton";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 shadow-md">
        <div className="container mx-auto flex justify-center items-center">
          {/* Logo */}

          {/* Navigation Links */}
          <div className="flex space-x-4">
            {session ? (
              <div className="flex items-center space-x-4">
                <span className="text-green-400">
                  Bienvenue, {session.user?.name || session.user?.email}
                </span>
                <SignOutButton />
              </div>
            ) : (
              <>
                <Link href="/auth/signin" className="hover:text-gray-300">
                  Connexion
                </Link>
                <Link href="/auth/register" className="hover:text-gray-300">
                  Inscription
                </Link>
              </>
            )}
          </div>

          {/* Search Bar Placeholder */}
          <div>
            {/* <input type="text" placeholder="Rechercher..." className="p-1 rounded text-gray-900" /> */}
          </div>
        </div>
      </nav>
    </div>
  );
}
