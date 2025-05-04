import { API_ENDPOINTS } from "./endpoints";

const useApiMethods = () => {
    const getTodoList = async () => {
        const response = fetch(API_ENDPOINTS.BASE_URL).then((res) =>
            res.json()
        );

        return response;
    };

    const addCard = async () => {};

    const updateTask = async (
        id: string,
        params: { todo?: string; completed?: boolean }
    ) => {
        const response = await fetch(`${API_ENDPOINTS.BASE_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(params),
        }).then((res) => res.json());

        console.log(response, "helo");

        return response;
    };

    return { addCard, updateTask, getTodoList };
};

export default useApiMethods;
