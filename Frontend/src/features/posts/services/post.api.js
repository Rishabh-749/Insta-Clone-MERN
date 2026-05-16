import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
    withCredentials: true
})

export const getFeed = async ()=>{
    const res = await api.get("/posts/feed")
    return res.data
}

export const createPost = async (formData)=>{
    const res = await api.post("/posts", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    return res.data
}

export const toggleLikeAPI = async (postId) => {
    const res = await api.post(`/posts/like/${postId}`);
    return res.data;
}