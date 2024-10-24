import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ChatInterface from '@/components/Chat/ChatInterface';
import FileManager from '@/components/FileUpload/FileManager';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import '@/styles/globals.css';
export default function ChatPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
    } else {
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
    <div className="flex h-screen">
      <div className="w-80 bg-gray-50 p-4 overflow-auto">
        <FileManager />
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full mt-4"
        >
          Logout
        </Button>
      </div>
      <div className="flex-1">
        <ChatInterface />
      </div>
    </div>
    </Layout>
  );
}