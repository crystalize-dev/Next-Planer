import React from 'react';
import { icons, IconType } from './icons-database';

interface IconProps extends React.HTMLAttributes<SVGSVGElement> {
    icon: IconType;
}

export default function Icon({ icon, ...props }: IconProps) {
    const { className, ...otherProps } = props;

    return (
        <svg
            {...otherProps}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={'h-5 w-5 cursor-pointer select-none ' + className}
        >
            {typeof icons[icon] !== 'string' ? (
                (icons[icon] as Array<string>).map((path: string) => (
                    <path
                        key={path}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={path}
                    />
                ))
            ) : (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={icons[icon] as string}
                />
            )}
        </svg>
    );
}
