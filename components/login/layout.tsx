import React, { ReactNode } from 'react';
import { ToastProvider } from '../ui/toast';
import { Toaster } from '@/components/ui/toaster';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10 px-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          {children}
        </div>
        <Toaster />
      </div>
    </ToastProvider>
  );
};

export default Layout;
