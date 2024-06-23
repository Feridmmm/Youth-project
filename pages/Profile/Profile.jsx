import React, { useState, useEffect } from 'react';
import './Profile.css';
import { useUser } from '../../context/UserContext';
import Navbar from '../../components/Navbar/navbar';

const Profile = () => {
  const { user, updateUser } = useUser();
  const [editMode, setEditMode] = useState(false);
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (user) {
      setAddress(user.address || '');
      setZipCode(user.zip_code || '');
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updateData = { address, zip_code: zipCode, password };
    const success = await updateUser(updateData);
    if (success) {
      setEditMode(false);
      alert('Profile updated successfully!');
    } else {
      alert('Failed to update profile.');
    }
  };

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="profile-page">
      <Navbar />
      <div className="profile-container">
        <div className="profile-header">
          <h2>Profile</h2>
          <button className="update-button" onClick={() => setEditMode(true)}>Edit Profile</button>
        </div>
        <div className="profile-content">
          <div className="profile-info-left">
            <label htmlFor="avatar-upload">
              <img src={avatar || "https://via.placeholder.com/150"} alt="Profile" className="profile-image" />
            </label>
            <input type="file" id="avatar-upload" className="avatar-upload" onChange={handleAvatarChange} />
            <p>Email: {user?.email}</p>
            <p>Address: {user?.address}</p>
            <p>Zip Code: {user?.zip_code}</p>
          </div>
          <div className="profile-info-right">
            {editMode && (
              <form onSubmit={handleUpdate} className="update-form">
                <div className="form-group">
                  <input
                    type="text"
                    value={user?.first_name}
                    placeholder="First Name"
                    readOnly
                  />
                  <input
                    type="text"
                    value={user?.last_name}
                    placeholder="Last Name"
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    value={user?.email}
                    placeholder="Email"
                    readOnly
                  />
                  <input
                    type="text"
                    value={user?.phone}
                    placeholder="Phone"
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    value={address}
                    placeholder="Address"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <input
                    type="text"
                    value={zipCode}
                    placeholder="Zip Code"
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    value={password}
                    placeholder="New Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="save-button">Save Profile</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
