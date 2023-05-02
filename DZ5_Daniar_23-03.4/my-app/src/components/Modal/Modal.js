import React from 'react';
import classes from './Modal.module.css';
import Button from '../Button/Button';

const Modal = ({ handleShow, setNewTask, handleAddTask, handleClearTasks }) => {
    return (
        <>
            <div onClick={handleShow} className={classes.modalWrapper}></div>
            <div className={classes.modalContent}>
                <input onChange={(event) => setNewTask(event.target.value)} type="text" name="task" />
                <Button handleClick={handleAddTask}>
                    <p>Добавить таски</p>
                </Button>
                <Button handleClick={handleClearTasks}>
                    <p>Очистить все таски</p>
                </Button>
            </div>
        </>
    );
};

export default Modal;
