// Navbar.js
import React from 'react';
import Link from 'next/link';
import useAuthStore from '@/utils/store';
import { useRouter } from 'next/router';
import { logoutUser } from '@/utils/api';
import toast from 'react-hot-toast';

const Navbar = () => {
  const user = useAuthStore((state) => state.user);
  const clearUser = useAuthStore((state) => state.clearUser);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutUser();
      clearUser();
      toast.success('Logged out successfully');
      router.push('/auth/login');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  return (
    <nav className="bg-[#800000] p-2">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="text-white font-semibold text-lg">MG</span>
          <Link href="/" className="text-white hover:text-blue-300">
            Home
          </Link>
          <Link href="/about" className="text-white hover:text-blue-300">
            About
          </Link>
          <Link href="/contact" className="text-white hover:text-blue-300">
            Contact
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-white">
                Welcome "{user.first_name || 'User'} {user.last_name || 'User'}"
              </span>
              <Link
                href="/profile"
                className="text-white hover:text-blue-300"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-400"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="text-white hover:text-blue-300"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="text-white hover:text-blue-300"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;