import { useEffect, useState } from 'react';
import { getDaysInMonth } from '@/app/utility/getDaysInMonth';

export type FilterType = 'Месяц' | 'Неделя';

export const useDateTime = () => {
    const filters: FilterType[] = ['Месяц', 'Неделя'];
    const [activeFilter, setActiveFilter] = useState<FilterType>('Месяц');

    const daysRaw = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
    ];

    const [currentDateTime, setCurrentDateTime] = useState(
        new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    );
    const [currentMonth, setCurrentMonth] = useState(
        currentDateTime.getMonth() + 1
    );
    const [currentWeek, setCurrentWeek] = useState(1);

    const [dayArray, setDayArray] = useState<Array<Date>>([]);

    const increaseDateTime = () => {
        switch (activeFilter) {
            case 'Месяц':
                setCurrentDateTime(
                    new Date(
                        currentDateTime.setMonth(currentDateTime.getMonth() + 1)
                    )
                );
                break;
            case 'Неделя': {
                const nextWeek = currentWeek + 1;

                if (nextWeek === 5) {
                    setCurrentWeek(1);
                    setCurrentDateTime(
                        new Date(
                            currentDateTime.setMonth(
                                currentDateTime.getMonth() + 1
                            )
                        )
                    );
                } else {
                    setCurrentWeek(nextWeek);
                }
            }
        }
    };
    const increaseByYear = () => {
        setCurrentDateTime(
            new Date(
                currentDateTime.setFullYear(currentDateTime.getFullYear() + 1)
            )
        );
    };
    const decreaseDateTime = () => {
        switch (activeFilter) {
            case 'Месяц':
                setCurrentDateTime(
                    new Date(
                        currentDateTime.setMonth(currentDateTime.getMonth() - 1)
                    )
                );
                break;
            case 'Неделя': {
                const prevWeek = currentWeek - 1;

                if (prevWeek === 0) {
                    setCurrentWeek(4);
                    setCurrentDateTime(
                        new Date(
                            currentDateTime.setMonth(
                                currentDateTime.getMonth() - 1
                            )
                        )
                    );
                } else {
                    setCurrentWeek(prevWeek);
                }
            }
        }
    };
    const decreaseByYear = () => {
        setCurrentDateTime(
            new Date(
                currentDateTime.setFullYear(currentDateTime.getFullYear() - 1)
            )
        );
    };

    const getMonthYearNames = (date: Date) => {
        const monthOptions = { month: 'long' };
        //@ts-expect-error "all ok"
        const monthName = date.toLocaleString('ru-RU', monthOptions);
        const year = date.getFullYear();

        return { monthName, year, currentWeek };
    };

    // Откатить время до первого дня месяца
    const nullTheMonth = (date: Date) => {
        setCurrentWeek(1);
        return new Date(date.getFullYear(), date.getMonth(), 1);
    };

    useEffect(() => {
        setCurrentMonth(currentDateTime.getMonth() + 1);
    }, [currentDateTime]);

    useEffect(() => {
        if (activeFilter !== 'Неделя')
            setCurrentDateTime(nullTheMonth(currentDateTime));
    }, [currentMonth]);

    useEffect(() => {
        if (activeFilter === 'Месяц') {
            setDayArray(getDaysInMonth(currentDateTime));
        } else {
            setDayArray(getDaysInMonth(currentDateTime, currentWeek));
        }
    }, [currentDateTime, currentWeek, activeFilter]);

    return {
        filters,
        activeFilter,
        increaseDateTime,
        decreaseDateTime,
        increaseByYear,
        decreaseByYear,
        setActiveFilter,
        beautifulNames: getMonthYearNames(currentDateTime),
        dayArray
    };
};
