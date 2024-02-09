'use client';
import { useDateTime } from '@/app/hooks/useDateTime';
import Button from '@/app/components/UI/Button/Button';
import Icon from '@/app/components/Icon/Icon';
import InputSelect from '@/app/components/UI/Inputs/InputSelect';
import DateCard from '@/app/components/UI/dateCard';

export default function Home() {
    const {
        filters,
        activeFilter,
        increaseDateTime,
        increaseByYear,
        decreaseByYear,
        decreaseDateTime,
        beautifulNames,
        setActiveFilter,
        dayArray
    } = useDateTime();

    return (
        <main className="flex w-full grow flex-col">
            <div
                className={
                    'flex h-16 min-h-16 w-full items-center justify-between px-8'
                }
            >
                <div className={'flex h-fit w-fit items-center gap-2 p-2'}>
                    <Button variant={'bordered'} onClick={decreaseByYear}>
                        <Icon icon={'arrowLeftDouble'} />
                    </Button>
                    <Button variant={'bordered'} onClick={decreaseDateTime}>
                        <Icon icon={'arrowLeft'} />
                    </Button>
                    <Button variant={'bordered'} onClick={increaseDateTime}>
                        <Icon icon={'arrowRight'} />
                    </Button>
                    <Button variant={'bordered'} onClick={increaseByYear}>
                        <Icon icon={'arrowRightDouble'} />
                    </Button>
                    <h1 className={'ml-2 text-xl font-bold capitalize'}>
                        {beautifulNames.monthName +
                            ' ' +
                            beautifulNames.year +
                            ', ' +
                            beautifulNames.currentWeek +
                            ' Неделя'}
                    </h1>
                </div>

                <InputSelect
                    options={filters}
                    activeOption={activeFilter}
                    setActiveOption={setActiveFilter}
                />
            </div>
            <div
                className={`gridSpecial grid h-full w-full grid-cols-7 ${activeFilter === 'Неделя' ? 'customRows-week' : 'customRows-month'}`}
            >
                <h1
                    className={
                        'h-fit w-full border-l border-r border-t border-solid border-border p-2 text-center font-bold'
                    }
                >
                    Понедельник
                </h1>
                <h1
                    className={
                        'h-fit w-full border-l border-r border-t border-solid border-border p-2 text-center font-bold'
                    }
                >
                    Вторник
                </h1>
                <h1
                    className={
                        'h-fit w-full border-l border-r border-t border-solid border-border p-2 text-center font-bold'
                    }
                >
                    Среда
                </h1>
                <h1
                    className={
                        'h-fit w-full border-l border-r border-t border-solid border-border p-2 text-center font-bold'
                    }
                >
                    Четверг
                </h1>
                <h1
                    className={
                        'h-fit w-full border-l border-r border-t border-solid border-border p-2 text-center font-bold'
                    }
                >
                    Пятница
                </h1>
                <h1
                    className={
                        'h-fit w-full border-l border-r border-t border-solid border-border p-2 text-center font-bold'
                    }
                >
                    Суббота
                </h1>
                <h1
                    className={
                        'h-fit w-full border-l border-r border-t border-solid border-border p-2 text-center font-bold'
                    }
                >
                    Воскресенье
                </h1>
                {dayArray.map((date, index) => (
                    <DateCard key={index} date={date} />
                ))}
            </div>
        </main>
    );
}
