import { useEffect, useState } from 'react';

function TimeShow() {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        var timer = setInterval(() => setDate(new Date()), 1000 );

        return () => {
            clearInterval(timer);
        };
    }, []);
    
    return (
        <div className='time-cmp'>
            <p>Time: {date.toLocaleTimeString()}</p>
        </div>
    );
};

export default TimeShow;
