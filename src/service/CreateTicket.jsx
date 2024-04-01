import AxiosService from "./AxiosService";

export const CreateTicket = async (data) => {
    try {
        const method = 'POST';
        const url = 'api/Ticket/CreateTicket';
        const body = data;

        const response = await AxiosService(method, url, body);

        return response;
    } catch (error) {
        return error
    }
}