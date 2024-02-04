import React from 'react';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant: 'black' | 'bordered' | 'colored';
    disabled?: boolean;
    type?: 'button' | 'submit';
}

const Button = ({ children, disabled, ...props }: ButtonProps) => {
    const { className, ...propsWithoutClass } = props;

    const getStyles = () => {
        switch (props.variant) {
            case 'black':
                return `rounded-md border-2 border-solid border-transparent bg-black px-4 py-2 text-white transition-all hover:border-black hover:bg-white hover:text-black ${disabled && '!opacity-50 !bg-black !border-transparent !text-white cursor-not-allowed'}`;
            case 'bordered':
                return `border-solid border border-border text-black p-1 hover:bg-black hover:text-white transition-all`;
            case 'colored':
                return `rounded-md border-2 border-solid border-transparent bg-main px-4 py-2 text-white transition-all hover:border-main hover:bg-white hover:text-main ${disabled && '!opacity-50 !bg-main !border-transparent !text-white cursor-not-allowed'}`;
            default:
                return '';
        }
    };

    return (
        <button
            disabled={disabled}
            className={getStyles() + ' ' + className}
            {...propsWithoutClass}
        >
            {children}
        </button>
    );
};

export default Button;
