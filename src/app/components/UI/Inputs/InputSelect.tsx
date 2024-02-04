import React, { useState } from 'react';
import Icon from '../../Icon/Icon';
import { AnimatePresence, motion } from 'framer-motion';

interface SelectProps<T> {
    options: Array<T>;
    activeOption: T;
    setActiveOption: React.Dispatch<React.SetStateAction<T>>;
}

const InputSelect = <T,>({
    options,
    activeOption,
    setActiveOption
}: SelectProps<T>) => {
    const [isOptionsOpened, setOptionsOpened] = useState(false);

    const selectOptionAndClose = (option: T) => {
        setActiveOption(option);
        setOptionsOpened(false);
    };

    return (
        <div className={'relative h-fit w-fit select-none'}>
            <div
                className={
                    'flex h-fit w-fit min-w-24 cursor-pointer items-center justify-between gap-2 p-2 hover:bg-zinc-100'
                }
                onClick={() => setOptionsOpened(!isOptionsOpened)}
            >
                <p>{activeOption as string}</p>
                <Icon icon={'arrowDown'} />
            </div>

            <AnimatePresence>
                {isOptionsOpened && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 30 }}
                        className={
                            'absolute z-20 mt-2 flex h-fit w-full flex-col border border-solid border-black/15 bg-white shadow-around'
                        }
                    >
                        {options.map((option) => (
                            <p
                                className={
                                    'cursor-pointer p-2 hover:bg-mainLighter'
                                }
                                key={option as string}
                                onClick={() => selectOptionAndClose(option)}
                            >
                                {option as string}
                            </p>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
export default InputSelect;
