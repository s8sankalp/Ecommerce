import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { usersAPI } from '../services/api.ts';
import { User } from '../types/index.ts';
import AccountNav from '../components/AccountNav.tsx';
import './Account.css';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaSave } from 'react-icons/fa';

const Profile: React.FC = () => {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const [profile, setProfile] = useState<Partial<User>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: {
          street: user.address?.street || '',
          city: user.address?.city || '',
          state: user.address?.state || '',
          zipCode: user.address?.zipCode || '',
          country: user.address?.country || ''
        }
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setProfile(prev => ({
        ...prev,
        address: { ...prev.address, [field]: value } as User['address']
      }));
    } else {
      setProfile(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      await usersAPI.updateProfile(profile);
      setSuccess('Profile updated successfully!');
      // Optional: Refresh user context after update
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };
  
  if (authLoading) return <div className="loading-container"><div className="spinner"></div></div>;
  if (!isAuthenticated) return <div className="error-container">Please log in to view your profile.</div>;

  return (
    <div className="account-page-container">
      <AccountNav />
      <div className="account-content">
        <div className="account-header">
          <h1>My Profile</h1>
          <p>Manage your personal information and address.</p>
        </div>

        {error && <div className="notice error">{error}</div>}
        {success && <div className="notice success">{success}</div>}

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-section">
            <h3>Personal Information</h3>
            <div className="form-grid">
              <div className="input-group">
                <label htmlFor="name"><FaUser /> Full Name</label>
                <input type="text" id="name" name="name" value={profile.name || ''} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label htmlFor="email"><FaEnvelope /> Email Address</label>
                <input type="email" id="email" name="email" value={profile.email || ''} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label htmlFor="phone"><FaPhone /> Phone Number</label>
                <input type="tel" id="phone" name="phone" value={profile.phone || ''} onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Shipping Address</h3>
            <div className="form-grid">
              <div className="input-group full-width">
                <label htmlFor="address.street"><FaMapMarkerAlt /> Street Address</label>
                <input type="text" id="address.street" name="address.street" value={profile.address?.street || ''} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label htmlFor="address.city">City</label>
                <input type="text" id="address.city" name="address.city" value={profile.address?.city || ''} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label htmlFor="address.state">State</label>
                <input type="text" id="address.state" name="address.state" value={profile.address?.state || ''} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label htmlFor="address.zipCode">ZIP Code</label>
                <input type="text" id="address.zipCode" name="address.zipCode" value={profile.address?.zipCode || ''} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label htmlFor="address.country">Country</label>
                <input type="text" id="address.country" name="address.country" value={profile.address?.country || ''} onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-save-changes" disabled={saving}>
              <FaSave /> {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile; 