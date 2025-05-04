import React from "react";
import style from "./index.module.scss";

interface IBoardWrapper {
    title: string;
    children: React.ReactNode;
    handleDrop: (e: React.DragEvent) => void;
    handleAdd?: () => void;
}

const BoardWrapper = (props: IBoardWrapper) => {
    const { title, children, handleDrop, handleAdd } = props;

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    return (
        <div
            className={style.wrapper}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            <div className={style.wrapperHead}>
                <h3>{title}</h3>
                {handleAdd && (
                    <img
                        src="/images/plus.png"
                        alt="plus"
                        onClick={handleAdd}
                    />
                )}
            </div>
            {children}
        </div>
    );
};

export default BoardWrapper;
