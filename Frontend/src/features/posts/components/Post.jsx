import React, { useState } from "react";
import "remixicon/fonts/remixicon.css";
import { toggleLikeAPI } from "../services/post.api";

const Post = ({ post }) => {
  const {
    _id,
    user,
    profileImage,
    caption,
    imgUrl,
    isLiked: initialIsLiked,
  } = post;

  const [isLiked, setIsLiked] = useState(initialIsLiked || false);
  const [showHeartOverlay, setShowHeartOverlay] = useState(false);

  const handleLikeToggle = async () => {
    // Optimistic UI update
    setIsLiked(!isLiked);
    try {
      await toggleLikeAPI(_id);
    } catch (error) {
      console.error("Failed to toggle like", error);
      // Revert on failure
      setIsLiked(isLiked);
    }
  };

  const handleDoubleClick = () => {
    // Show animation
    setShowHeartOverlay(true);
    setTimeout(() => setShowHeartOverlay(false), 1000); // hide after animation
    
    // Only toggle API if it wasn't liked already
    if (!isLiked) {
      handleLikeToggle();
    }
  };

  return (
    <article className="post">
      <div className="post-header">
        <div className="user">
          <img src={user?.profileImage || profileImage} alt={user?.username} className="profile-photo" />

          <div className="user-info">
            <div className="title-row">
              <h3>{user?.username}</h3>
              <span className="time">3d</span>
            </div>
            <p>Sheriyans Coding School</p>
          </div>
        </div>

        <div className="header-actions">
          <button type="button" className="follow-btn">
            Follow
          </button>
          <button type="button" className="icon-btn" aria-label="More options">
            <i className="ri-more-fill"></i>
          </button>
        </div>
      </div>

      <div 
        className="post-image" 
        style={{ position: 'relative', cursor: 'pointer' }}
        onDoubleClick={handleDoubleClick}
      >
        <img src={imgUrl} alt="Post" />
        <i className={`ri-heart-3-fill heart-animation ${showHeartOverlay ? 'active' : ''}`}></i>
      </div>

      <div className="post-actions">
        <div className="left-actions">
          <button type="button" onClick={handleLikeToggle}>
            <i className={`like-btn-icon ${isLiked ? "liked ri-heart-3-fill" : "ri-heart-3-line"}`}></i>
            <span>178</span>
          </button>
          <button type="button">
            <i className="ri-chat-4-line"></i>
            <span>5</span>
          </button>
          <button type="button">
            <i className="ri-share-forward-line"></i>
            <span>5</span>
          </button>
        </div>

        <button type="button" className="save-btn" aria-label="Save post">
          <i className="ri-bookmark-line"></i>
        </button>
      </div>

      <div className="post-content">
        <p className="likes-line">
          Liked by <strong>harshvandanasharma</strong> and <strong>178 others</strong>
        </p>

        <p className="caption">
          <strong>{user?.username}</strong> {caption}
        </p>
      </div>
    </article>
  );
};

export default Post;
