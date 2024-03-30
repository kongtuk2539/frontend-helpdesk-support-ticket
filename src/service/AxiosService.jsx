import axios from 'axios';

const AxiosService = async (method, url, body) => {
    try {
        const response = await axios({
            method: method,
            url: url,
            data: body,
        });

        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export default AxiosService;