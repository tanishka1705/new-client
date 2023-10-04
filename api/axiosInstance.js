import axios from "axios";

const client = axios.create({
    baseURL : process.env.NEXT_PUBLIC_API_URL,
})

export default client;