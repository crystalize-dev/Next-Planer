'use client';
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IconType } from '@/app/components/Icon/icons-database';
import Icon from '@/app/components/Icon/Icon';
import AsideElem from '@/app/components/UI/asideElem';
import Button from '@/app/components/UI/Button/Button';
import { signOut } from 'next-auth/react';

interface SidebarProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

const Sidebar = ({ visible, setVisible }: SidebarProps) => {
    type linkType = {
        link: string;
        icon: IconType;
        title: string;
    };

    const links: linkType[] = [
        { title: 'Календарь', icon: 'calendar', link: '' },
        { title: 'Планы', icon: 'checklist', link: 'plans' }
    ];

    return (
        <div
            className={`absolute left-0 top-0 z-50 h-full w-full bg-modal transition-all ${visible ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
            onMouseDown={() => setVisible(false)}
        >
            <AnimatePresence>
                {visible && (
                    <motion.aside
                        initial={{ transform: 'translateX(-100%)' }}
                        animate={{ transform: 'translateX(0)' }}
                        exit={{ transform: 'translateX(-100%)' }}
                        className={
                            'flex h-full w-aside min-w-aside flex-col gap-4 bg-white'
                        }
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        <div
                            className={
                                'flex min-h-16 w-full flex-row-reverse items-center justify-between border-b border-solid border-border p-4'
                            }
                        >
                            <Icon
                                icon={'close'}
                                onClick={() => setVisible(false)}
                            />
                            <h1 className={'text-2xl font-bold'}>Навигация</h1>
                        </div>
                        <div className={'flex w-full grow flex-col gap-4 p-4'}>
                            {links.map((link) => (
                                <AsideElem
                                    key={link.title}
                                    link={link.link}
                                    icon={link.icon}
                                    title={link.title}
                                    onClick={() => setVisible(false)}
                                />
                            ))}

                            <Button
                                variant={'black'}
                                className={'mt-auto'}
                                onClick={() => signOut()}
                            >
                                Выйти
                            </Button>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Sidebar;
