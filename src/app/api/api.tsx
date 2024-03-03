import axios from "axios";

const commentsApi = axios.create({
    baseURL:"https://jsonplaceholder.typicode.com"
});

export async function getApiComments(){
    const response = await commentsApi.get("/comments");
    return response.data;
}

export default commentsApi;