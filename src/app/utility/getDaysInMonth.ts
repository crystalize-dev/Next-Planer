const insertNullsBeforeMonday = (date: Date, array: Array<Date>) => {
    const inputDate = new Date(date);
    const dayOfWeek = inputDate.getDay(); // Возвращает число от 0 (воскресенье) до 6 (суббота), где 1 - понедельник

    if (dayOfWeek !== 1) {
        // Если дата не начинается с понедельника
        let nullCount = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Разница между текущим днем и понедельником

        nullCount = nullCount % 7;

        const nullArray = new Array(nullCount).fill(null);

        // Вставляем null элементы в начало массива
        array = [...nullArray, ...array];
    }

    return array;
};

export const getDaysInMonth = (date: Date, weekNumber?: number) => {
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();

    const endDate = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = endDate.getDate();
    const daysArray = [];

    if (weekNumber) {
        const millisecondsInDay = 24 * 60 * 60 * 1000;

        // Получаем текущую дату и время в миллисекундах
        const currentDateTime = date.getTime();

        // Вычисляем разницу в днях между текущей датой и первым днем недели
        let dayDifference = date.getDay() - 1;
        if (dayDifference < 0) {
            dayDifference = 6;
        }

        // Вычисляем дату первого дня недели
        const firstDayOfWeek = new Date(
            currentDateTime - dayDifference * millisecondsInDay
        );

        // Вычисляем дату указанной недели
        const targetWeek = new Date(
            firstDayOfWeek.getTime() + (weekNumber - 1) * 7 * millisecondsInDay
        );

        // Создаем массив для хранения дат дней недели
        const datesOfWeek = [];

        // Заполняем массив дат дней недели
        for (let i = 0; i < 7; i++) {
            const day = new Date(targetWeek.getTime() + i * millisecondsInDay);
            datesOfWeek.push(day); // Преобразуем дату в строку и добавляем в массив
        }

        return datesOfWeek;
    } else {
        for (let day = 1; day <= daysInMonth; day++) {
            const currentDate = new Date(currentYear, currentMonth, day);
            daysArray.push(currentDate);
        }

        return insertNullsBeforeMonday(daysArray[0], daysArray);
    }
};
