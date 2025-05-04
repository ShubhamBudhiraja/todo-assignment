import React from "react";
import style from "./index.module.scss";

interface IBoardWrapper {
    title: string;
    children: React.ReactNode;
}

const BoardWrapper = (props: IBoardWrapper) => {
    const { title, children } = props;

    return (
        <div className={style.wrapper}>
            <div className={style.wrapperHead}>
                <h3>{title}</h3>
            </div>
            {children}
        </div>
    );
};

export default BoardWrapper;
