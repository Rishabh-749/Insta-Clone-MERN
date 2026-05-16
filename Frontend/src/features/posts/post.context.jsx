import { createContext, useState } from "react";

export const postContext = createContext();

export const PostContextProvider = ({children})=>{

    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState(null);
    const [feed, setFeed] = useState(null);

    return(
        <postContext.Provider value={{loading, setLoading, post, setPost,feed,setFeed}}>
            {children}
        </postContext.Provider>
    )
}