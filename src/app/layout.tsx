import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import '@xyflow/react/dist/style.css';
import { ParsingDataProvider } from '@/shared/context/parsingDataContext';
import React from 'react';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Jison Lens',
    description:
        'jison Lens is an online debugger for the Jison parser generator, designed to make grammar development and debugging easier.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ParsingDataProvider>{children}</ParsingDataProvider>
            </body>
        </html>
    );
}
