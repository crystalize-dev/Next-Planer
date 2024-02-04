import React, { useState } from 'react';
import Icon from '@/app/components/Icon/Icon';

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
    placeholder: string;
    type: 'email' | 'password' | 'text';
    name?: string;
    id?: string;
    required?: boolean;
    disabled?: boolean;
}

const InputTransparent = ({ ...props }: InputProps) => {
    const { placeholder, disabled, ...otherProps } = props;
    const [value, setValue] = useState('');

    return (
        <div className={'group relative flex w-full items-center'}>
            <input
                autoComplete={'off'}
                {...otherProps}
                disabled={disabled}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className={`w-full border-b-2 border-solid border-black !bg-transparent p-2 transition-all focus:border-main ${value && '!border-main'} ${disabled && 'cursor-not-allowed border-zinc-500'}`}
            />

            <p
                className={`pointer-events-none absolute top-2 select-none text-lg transition-all group-focus-within:-top-4 group-focus-within:text-sm ${value && '!-top-4 !text-sm !text-main'} ${disabled && 'text-zinc-400'}`}
            >
                {placeholder}
            </p>
        </div>
    );
};

export default InputTransparent;
