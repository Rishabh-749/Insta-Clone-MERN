import React from 'react';
import '../style/sidebar.scss';
import heroImage from '../../../assets/hero.png'; // Using hero image as placeholder avatar

const dummyFollowing = [
  { id: 1, username: 'sheriyans_coding', subtitle: 'Following you', avatar: heroImage },
  { id: 2, username: 'jane_doe', subtitle: 'Active 2h ago', avatar: heroImage },
  { id: 3, username: 'john_smith', subtitle: 'Active now', avatar: heroImage },
];

const dummyFollowers = [
  { id: 4, username: 'alex_dev', subtitle: 'Follows you', avatar: heroImage },
  { id: 5, username: 'maria_design', subtitle: 'Follows you', avatar: heroImage },
];

const dummySuggested = [
  { id: 6, username: 'tech_guru', subtitle: 'New to Instagram', avatar: heroImage },
  { id: 7, username: 'web_master', subtitle: 'Suggested for you', avatar: heroImage },
];

const LeftSidebar = () => {
  return (
    <aside className="left-sidebar">
      
      {/* Following Section */}
      <div className="sidebar-section">
        <h3><i className="ri-user-following-line"></i> Following</h3>
        {dummyFollowing.length > 0 ? (
          <div className="user-list">
            {dummyFollowing.map((user) => (
              <div key={user.id} className="user-row">
                <div className="user-info">
                  <img src={user.avatar} alt={user.username} className="avatar" />
                  <div className="details">
                    <p className="username">{user.username}</p>
                    <p className="subtitle">{user.subtitle}</p>
                  </div>
                </div>
                <button className="action-btn following">Following</button>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-state">You aren't following anyone yet.</p>
        )}
      </div>

      {/* Followers Section */}
      <div className="sidebar-section">
        <h3><i className="ri-group-line"></i> Followers</h3>
        {dummyFollowers.length > 0 ? (
          <div className="user-list">
            {dummyFollowers.map((user) => (
              <div key={user.id} className="user-row">
                <div className="user-info">
                  <img src={user.avatar} alt={user.username} className="avatar" />
                  <div className="details">
                    <p className="username">{user.username}</p>
                    <p className="subtitle">{user.subtitle}</p>
                  </div>
                </div>
                <button className="action-btn remove">Remove</button>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-state">No followers yet.</p>
        )}
      </div>

      {/* Suggested Users Section */}
      <div className="sidebar-section">
        <h3><i className="ri-user-add-line"></i> Suggested for you</h3>
        {dummySuggested.length > 0 ? (
          <div className="user-list">
            {dummySuggested.map((user) => (
              <div key={user.id} className="user-row">
                <div className="user-info">
                  <img src={user.avatar} alt={user.username} className="avatar" />
                  <div className="details">
                    <p className="username">{user.username}</p>
                    <p className="subtitle">{user.subtitle}</p>
                  </div>
                </div>
                <button className="action-btn follow">Follow</button>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-state">No suggestions right now.</p>
        )}
      </div>

    </aside>
  );
};

export default LeftSidebar;
