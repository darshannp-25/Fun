'use client';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-white text-xl font-bold">
                    FullStack Fun
                </Link>
                <div className="flex gap-4 items-center">
                    {!isAuthenticated ? (
                        <>
                            <Link href="/login" className="text-white hover:text-gray-300">
                                Login
                            </Link>
                            <Link href="/register" className="text-white hover:text-gray-300">
                                Register
                            </Link>
                        </>
                    ) : (
                        <>
                            <span className="text-gray-300 mr-4">Welcome, {user?.username}</span>
                            <button
                                onClick={logout}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
