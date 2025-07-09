'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full bg-blue-600 shadow-md py-4 px-8 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-white">FeedbackGenie</Link>
      <div className="space-x-6">
        <Link href="/" className="text-white hover:underline">Home</Link>
        <Link href="/register" className="text-white hover:underline">Register</Link>
        <Link href="/login" className="text-white hover:underline">Sign In</Link>
      </div>
    </nav>
  );
}
