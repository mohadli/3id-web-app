import axios from "axios";

export const addToDb = (requestBody) => {
    return axios.post('https://ens-gateway.popns.workers.dev/set', JSON.stringify(requestBody),  {
        headers: {
            'Content-Type': 'application/json',
        },
    })
};