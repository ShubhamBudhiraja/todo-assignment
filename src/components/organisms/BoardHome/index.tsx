import React, { useEffect, useState } from "react";
import style from "./index.module.scss";
import BoardWrapper from "src/components/atoms/BoardWrapper";
import useApiMethods from "src/services";
import Card from "src/components/molecules/Card";
import { ITask } from "src/types/common";
import TaskModal from "src/components/molecules/TaskModal";

const initialiseEditingTask = { todo: "", completed: undefined, id: "" };

const BoardHome = () => {
    const { getTodoList, updateTask, addCard } = useApiMethods();

    const [list, setList] = useState<{ completed: ITask[]; pending: ITask[] }>({
        completed: [],
        pending: [],
    });

    const [editingTask, setEditingTask] = useState<ITask>(
        initialiseEditingTask
    );
    const [edit, setEdit] = useState(false);
    const [newTask, setNewTask] = useState(false);

    const initialiser = async () => {
        const completedTasks: ITask[] = [];
        const pendingTasks: ITask[] = [];

        const res = await getTodoList();

        if (res.todos.length) {
            res.todos.forEach((element: ITask) => {
                if (element.completed) completedTasks.push(element);
                else pendingTasks.push(element);
            });
            setList({ completed: completedTasks, pending: pendingTasks });
        }
    };

    const handleUpdateTask = async (editingTask: ITask) => {
        if (newTask) {
            const res = await addCard(
                editingTask.todo,
                editingTask?.completed || false
            );

            const key = editingTask?.completed ? "completed" : "pending";

            setList((list: { completed: ITask[]; pending: ITask[] }) => ({
                ...list,
                [key]: [res, ...list[key]],
            }));

            setNewTask(false);
        } else {
            const { id, ...rest } = editingTask;
            const res = await updateTask(id, rest);

            if (res?.id) {
                if (editingTask.completed) {
                    const filtered = list.pending.filter(
                        (item: any) => item?.id !== res.id
                    );

                    let updatedCompletedList: ITask[] = list.completed.filter(
                        (item: any) => item?.id !== res.id
                    );

                    updatedCompletedList = [
                        editingTask,
                        ...updatedCompletedList,
                    ];

                    setList({
                        completed: updatedCompletedList,
                        pending: filtered,
                    });
                } else {
                    const filtered = list.completed.filter(
                        (item: any) => item?.id !== res.id
                    );
                    let updatedPendingList = list.pending.filter(
                        (item: any) => item?.id !== res.id
                    );

                    updatedPendingList = [editingTask, ...updatedPendingList];

                    setList({
                        completed: filtered,
                        pending: updatedPendingList,
                    });
                }
            }
        }

        setEditingTask(initialiseEditingTask);
    };

    const handleItemDrop = (cardData: string, status: boolean) => {
        const data = JSON.parse(cardData);
        handleUpdateTask({ ...data, completed: status });
    };

    useEffect(() => {
        initialiser();
    }, []);

    return (
        <>
            <div className={style.boardsContainer}>
                <BoardWrapper
                    title="Ongoing Tasks"
                    handleDrop={(e: React.DragEvent) => {
                        e.preventDefault();
                        handleItemDrop(
                            e.dataTransfer.getData("application/json"),
                            false
                        );
                    }}
                    handleAdd={() => {
                        setEdit(true);
                        setNewTask(true);
                    }}
                >
                    {list.pending?.map((item: any) => (
                        <Card
                            task={item?.todo}
                            handleEditClick={() => {
                                setEdit(true);
                                setEditingTask(item);
                            }}
                            handleOnDrag={(e: React.DragEvent) => {
                                e.dataTransfer.effectAllowed = "move";
                                e.dataTransfer.setData(
                                    "application/json",
                                    JSON.stringify(item)
                                );
                            }}
                        />
                    ))}
                </BoardWrapper>
                <BoardWrapper
                    title="Completed Tasks"
                    handleDrop={(e: React.DragEvent) => {
                        e.preventDefault();
                        handleItemDrop(
                            e.dataTransfer.getData("application/json"),
                            true
                        );
                    }}
                >
                    {list.completed?.map((item: any) => (
                        <Card
                            task={item?.todo}
                            handleEditClick={() => {
                                setEdit(true);
                                setEditingTask(item);
                            }}
                            handleOnDrag={(e: React.DragEvent) => {
                                e.dataTransfer.effectAllowed = "move";
                                e.dataTransfer.setData(
                                    "application/json",
                                    JSON.stringify(item)
                                );
                            }}
                        />
                    ))}
                </BoardWrapper>
            </div>
            <TaskModal
                show={edit}
                onHide={() => {
                    setEdit(false);
                    setNewTask(false);
                    setEditingTask(initialiseEditingTask);
                }}
                task={editingTask.todo}
                completed={editingTask.completed}
                handleCancel={() => {
                    setEdit(false);
                    setNewTask(false);
                    setEditingTask(initialiseEditingTask);
                }}
                handleSuccess={() => {
                    handleUpdateTask(editingTask);
                    setEdit(false);
                }}
                handleChange={(key: string, value: string | boolean) =>
                    setEditingTask((editingTask: ITask) => ({
                        ...editingTask,
                        [key]: value,
                    }))
                }
                modalTitle={newTask ? "Add Task" : "Edit Task"}
            />
        </>
    );
};

export default BoardHome;
