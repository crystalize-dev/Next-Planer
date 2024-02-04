import React from 'react';
import Icon from '../../Icon/Icon';

const Header = ({ setAside }: { setAside: (state: boolean) => void }) => {
    return (
        <nav className={'min-h-16 w-full border-b border-solid border-border'}>
            <div
                className={
                    'flex h-full w-aside min-w-aside items-center gap-2 p-4 lg:justify-between'
                }
            >
                <Icon icon={'menu'} onClick={() => setAside(true)} />
                <h1 className={'text-2xl font-bold text-zinc-400'}>
                    React-Planner
                </h1>
            </div>
        </nav>
    );
};

export default Header;
