'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'
import './globals.css';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/chat');
    }
  }, [router]);

  return (
    <div className="container mx-auto px-4">

    </div>
  );
}