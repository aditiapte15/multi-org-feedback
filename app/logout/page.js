'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    
    alert('You have been logged out.');
    router.push('/');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-100">
      <h1 className="text-xl font-bold text-red-600">Logging you out...</h1>
    </div>
  );
}
