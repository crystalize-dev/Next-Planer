import React, { MouseEventHandler } from 'react';
import { IconType } from '../Icon/icons-database';
import Icon from '../Icon/Icon';
import Link from 'next/link';

interface ElemProps {
    link: string;
    icon: IconType;
    title: string;
    onClick: MouseEventHandler<HTMLAnchorElement>;
}

const AsideElem = ({ link, icon, title, onClick }: ElemProps) => {
    return (
        <Link
            className={
                'flex w-full cursor-pointer items-center gap-2 rounded-md border border-solid border-border p-2 transition-all hover:border-transparent hover:bg-main hover:text-white'
            }
            onClick={onClick}
            href={'/' + link}
        >
            <Icon icon={icon} />
            {title}
        </Link>
    );
};

export default AsideElem;
