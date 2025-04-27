import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

interface ProfileData {
  id: number;
  username: string;
  email: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:8000/profile/', {
          headers: {
            'Authorization': `Token ${token}`,
          }
        });

        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          toast.error('Failed to fetch profile');
          if (response.status === 401) {
            localStorage.removeItem('token');
            navigate('/login');
          }
        }
      } catch (error) {
        console.error('Profile fetch error:', error);
        toast.error('Error loading profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
      padding: '40px 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <style>
        {`
        .profile-card {
          background: #fff;
          border-radius: 24px;
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
          padding: 48px 36px 36px 36px;
          max-width: 420px;
          width: 100%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          animation: fadeInProfile 0.6s cubic-bezier(.4,0,.2,1);
        }
        @keyframes fadeInProfile {
          from { opacity: 0; transform: translateY(30px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .profile-avatar {
          width: 96px;
          height: 96px;
          border-radius: 50%;
          background: linear-gradient(135deg, #4e54c8 0%, #8f94fb 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.8rem;
          color: #fff;
          font-weight: 700;
          margin-bottom: 18px;
          box-shadow: 0 4px 16px rgba(78,84,200,0.10);
          border: 4px solid #fff;
        }
        .profile-username {
          font-size: 1.5rem;
          font-weight: 700;
          color: #222;
          margin-bottom: 4px;
          letter-spacing: 0.5px;
          text-align: center;
        }
        .profile-email {
          font-size: 1.05rem;
          color: #666;
          margin-bottom: 24px;
          text-align: center;
        }
        .profile-divider {
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, #4e54c8 0%, #8f94fb 100%);
          border-radius: 2px;
          margin: 0 auto 24px auto;
        }
        .profile-action-btn {
          display: inline-block;
          background: linear-gradient(90deg, #4e54c8 0%, #8f94fb 100%);
          color: white;
          padding: 14px 32px;
          border-radius: 30px;
          font-weight: 700;
          font-size: 1.1rem;
          box-shadow: 0 4px 16px rgba(78,84,200,0.10);
          text-decoration: none;
          letter-spacing: 1px;
          transition: all 0.2s;
          margin-top: 18px;
        }
        .profile-action-btn:hover, .profile-action-btn:focus {
          background: linear-gradient(90deg, #3b3fc8 0%, #6a6ffb 100%);
          color: #fff;
        }
        @media (max-width: 600px) {
          .profile-card {
            padding: 28px 8px 18px 8px;
          }
          .profile-avatar {
            width: 70px;
            height: 70px;
            font-size: 2rem;
          }
        }
        `}
      </style>
      <div className="profile-card">
        <div className="profile-avatar">
          {profile?.username ? profile.username.charAt(0).toUpperCase() : "U"}
        </div>
        <div className="profile-username">{profile?.username}</div>
        <div className="profile-email">{profile?.email}</div>
        <div className="profile-divider"></div>
        <Link to="/create" className="profile-action-btn">
          + Add New Mobile
        </Link>
      </div>
    </div>
  );
};

export default Profile;
