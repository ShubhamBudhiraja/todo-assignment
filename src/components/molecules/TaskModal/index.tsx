import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import style from "./index.module.scss";

interface ITaskModal {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    task?: string;
    completed?: boolean;
    handleSuccess: () => void;
    handleCancel: () => void;
    handleChange: (key: string, value: string | boolean) => void;
}

const TaskModal = (props: ITaskModal) => {
    const {
        show,
        setShow,
        task,
        completed,
        handleCancel,
        handleSuccess,
        handleChange,
    } = props;

    return (
        <Modal show={show} onHide={() => setShow(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Task</Modal.Title>
            </Modal.Header>
            <Modal.Body className={style.modalBody}>
                <textarea
                    value={task}
                    onChange={(e: any) =>
                        handleChange("todo", e?.target?.value)
                    }
                />
                <Form.Check
                    checked={completed}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange("completed", e?.target?.checked)
                    }
                    label="Mark as completed"
                ></Form.Check>
            </Modal.Body>
            <Modal.Footer className={style.modalFooter}>
                <Button variant="outline-secondary" onClick={handleCancel}>
                    Cancel
                </Button>
                <Button variant="secondary" onClick={handleSuccess}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TaskModal;
