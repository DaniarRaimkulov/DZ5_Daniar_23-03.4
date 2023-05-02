import React from 'react';
import classes from './Container.module.css';

const Container = ({ children, setFilter, filter }) => {
    return (
        <div className={classes.container}>
            {children}
            <select onChange={(event) => setFilter(event.target.value)} value={filter}>
                <option value="all">Все таски</option>
                <option value="completed">Выполненные</option>
                <option value="notCompleted">Не выполненные</option>
            </select>
        </div>
    );
};

export default Container;
