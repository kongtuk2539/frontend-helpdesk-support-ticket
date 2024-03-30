import AxiosService from "./AxiosService";

export const UpdateTicket = async (data, id) => {
    try {
        const method = 'PUT';
        const url = `https://localhost:7232/api/Ticket/UpdateTicket/${id}`;
        const body = data;

        const response = await AxiosService(method, url, body);

        return response;
    } catch (error) {
        return error
    }
}