import AxiosService from "./AxiosService";

export const GetTicket = async () => {
    try {
        const method = 'GET';
        const url = 'https://localhost:7232/api/Ticket/GetTicket';
        const body = {}

        const response = await AxiosService(method, url, body);

        return response;
    } catch (error) {
        return error
    }
}