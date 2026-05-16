import "../style/feed.scss";
import Post from "../components/Post";
import Nav from "../../shared/components/Nav";
import LeftSidebar from "../../shared/components/LeftSidebar";
import heroImage from "../../../assets/hero.png";
import {usePost} from "../hooks/usePost"
import { useEffect } from "react";

const dummyPost = {
  username: "sheriyans_coding_school",
  subTitle: "Sheriyans Coding School",
  time: "3d",
  profileImage: heroImage,
  postImage: heroImage,
  likes: "178",
  comments: "5",
  shares: "5",
  likedBy: "harshvandanasharma",
  caption:
    "Learn complete Data Science, Gen AI & Machine Learning and get placed in one of the biggest companies...",
};

const Feed = () => {

  const {feed, handleGetFeed, loading} = usePost();

  useEffect(()=>{
    handleGetFeed()
  },[])
  
  if(loading || !feed){
    return (
      <main>
        <Nav />
        <h1>Feed is Loading...</h1>
      </main>
    )
  }
  
  
  return (
    <>
      <Nav />
      <section className="feed-page">
        <div className="feed-layout">
          <LeftSidebar />
          <div className="feed">
            {
              feed.map((item, index)=>{
                return <Post key={index} post={item} />
              })
            }
          </div>
        </div>
      </section>
    </>
  );
};

export default Feed;
