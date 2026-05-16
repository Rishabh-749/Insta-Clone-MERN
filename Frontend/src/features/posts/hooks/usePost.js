import { useContext } from "react";
import { postContext } from "../post.context";
import {getFeed, createPost} from "../services/post.api"

export const usePost =  ()=>{
    const context = useContext(postContext);
    
    const {loading, setLoading, feed, setFeed, post, setPost} = context;

    const handleGetFeed = async ()=>{
        setLoading(true);
        const res = await getFeed();
        setFeed(res.posts);
        setLoading(false);
        return res;
    }

    const handleCreatePost = async (formData)=>{
        setLoading(true);
        try {
            const res = await createPost(formData);
            // Optionally update feed here or re-fetch after successful post
            setLoading(false);
            return res;
        } catch (error) {
            setLoading(false);
            console.error("Error creating post:", error);
            throw error;
        }
    }
    
    return {
        feed, loading, handleGetFeed, handleCreatePost, post
    }
}