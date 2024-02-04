import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import React from 'react';
import ContextProviders from '@/app/ContextProviders';
import './globals.css';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
    title: 'Next-Planer'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" id={'root'}>
            <body className={poppins.className}>
                <ContextProviders>{children}</ContextProviders>
            </body>
        </html>
    );
}
