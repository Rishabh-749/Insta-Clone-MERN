import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { usePost } from '../hooks/usePost';
import '../style/create-post.scss';

const CreatePostModal = () => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [caption, setCaption] = useState('');
  const navigate = useNavigate();
  const { handleCreatePost, loading } = usePost();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const handlePost = async () => {
    if (!image) return;
    
    const formData = new FormData();
    formData.append('image', image);
    formData.append('caption', caption);

    try {
      await handleCreatePost(formData);
      navigate('/');
    } catch (error) {
      console.error('Failed to create post', error);
      // Optional: add toast notification for error here
    }
  };

  const handleClose = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="modal-overlay">
      <div className="create-post-modal">
        <div className="modal-header">
          <h2>Create New Post</h2>
          <button className="close-btn" onClick={handleClose} aria-label="Close modal">
            <i className="ri-close-line"></i>
          </button>
        </div>

        <div className="modal-body">
          <div className="image-upload-container">
            {!previewUrl ? (
              <div className="upload-area">
                <i className="ri-image-add-line"></i>
                <span>Choose an image</span>
                <p>JPEG, PNG, JPG</p>
                <input 
                  type="file" 
                  accept="image/png, image/jpeg, image/jpg" 
                  onChange={handleImageChange}
                  title="Choose an image"
                />
              </div>
            ) : (
              <div className="image-preview">
                <img src={previewUrl} alt="Preview" />
                <button className="remove-image-btn" onClick={removeImage} aria-label="Remove image">
                  <i className="ri-delete-bin-line"></i>
                </button>
              </div>
            )}
          </div>

          <div className="caption-container">
            <textarea
              placeholder="Write a caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              disabled={loading}
            ></textarea>
          </div>
        </div>

        <div className="modal-footer">
          <button 
            className="post-btn" 
            onClick={handlePost}
            disabled={!image || loading}
          >
            {loading ? 'Sharing...' : 'Share'} <i className="ri-send-plane-fill"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
