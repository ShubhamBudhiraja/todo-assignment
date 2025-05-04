import React from "react";
import style from "./index.module.scss";

interface ICard {
    task: string;
    handleEditClick: () => void;
    handleOnDrag: (e: React.DragEvent) => void;
}

const Card = (props: ICard) => {
    const { task, handleEditClick, handleOnDrag } = props;

    return (
        <div className={style.cardWrap} draggable onDragStart={handleOnDrag}>
            <img src="/images/drag.png" className="d-none d-md-block" alt="" />
            <div className={style.taskWrap}>
                <p>{task}</p>
            </div>
            <img
                src="/images/edit.png"
                className={style.editIcon}
                alt=""
                onClick={(e: any) => {
                    e.preventDefault();
                    handleEditClick();
                }}
            />
        </div>
    );
};

export default Card;
