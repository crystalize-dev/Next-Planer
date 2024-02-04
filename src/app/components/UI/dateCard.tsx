import React from 'react';

interface CardProps {
    date: Date;
}

const DateCard = ({ date }: CardProps) => {
    return (
        <div
            className={
                'h-full min-h-48 w-full min-w-48 border border-solid border-border bg-white p-2'
            }
        >
            {date && date.getDate()}
        </div>
    );
};

export default DateCard;
