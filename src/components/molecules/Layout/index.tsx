import React from "react";
import style from "./index.module.scss";

interface ILayout {
    children: React.ReactNode;
}

const Layout = (props: ILayout) => {
    const { children } = props;

    return (
        <div className={style.layoutWrapper}>
            <div className="p-3">
                <header>
                    <h1>Todo Board</h1>
                </header>
                {children}
            </div>
        </div>
    );
};

export default Layout;
