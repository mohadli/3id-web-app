import {useQuery} from "@tanstack/react-query";
import axios from 'axios';


export const useGetDomains = () => {
    return  useQuery({
        queryKey: ['domains-list'],
        queryFn: async() => {
            const {data} = await axios.get(`https://ens-gateway.popns.workers.dev/names`)
            return data;
        }
    })
}