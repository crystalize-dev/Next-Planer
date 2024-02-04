'use client';
import React from 'react';
import { usePlans } from '@/app/hooks/usePlans';
import { PlansContext } from '@/app/context/PlansContext';
import Header from '@/app/components/Navigation/Header/Header';
import Sidebar from '@/app/components/Navigation/Sidebar/Sidebar';
import { SessionProvider, useSession } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';

export function AppProvider({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ContextProviders>
                <Toaster />
                {children}
            </ContextProviders>
        </SessionProvider>
    );
}

const ContextProviders = ({ children }: { children: React.ReactNode }) => {
    const { plans, addPlan, removePlan } = usePlans();
    const [aside, setAside] = React.useState(false);

    const session = useSession();

    return (
        <PlansContext.Provider value={{ plans, addPlan, removePlan }}>
            <div
                className={
                    'scrollable flex h-screen max-h-full min-h-screen w-full min-w-full max-w-full flex-col'
                }
            >
                {session.status === 'authenticated' && (
                    <Header setAside={setAside} />
                )}

                {session.status === 'authenticated' && (
                    <Sidebar visible={aside} setVisible={setAside} />
                )}

                {children}
            </div>
        </PlansContext.Provider>
    );
};

export default AppProvider;
