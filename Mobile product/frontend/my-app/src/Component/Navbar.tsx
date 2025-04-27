import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        toast.success('Logged out successfully');
        navigate('/login');
    };

    return (
        <nav style={{
            background: 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(10px)',
            padding: '16px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            position: 'sticky',
            top: 0,
            zIndex: 1000
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Link to="/" style={{
                    textDecoration: 'none',
                    color: '#333',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    transition: 'color 0.3s',
                }} onMouseEnter={(e) => e.currentTarget.style.color = '#4e54c8'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#333'}>
                    Mobile Store
                </Link>
                <div style={{ display: 'flex', gap: '15px' }}>
                    {isAuthenticated ? (
                        <>
                            <Link to="/profile" style={{
                                textDecoration: 'none',
                                background: '#17a2b8',
                                color: 'white',
                                padding: '10px 20px',
                                borderRadius: '8px',
                                fontWeight: 600,
                                transition: 'all 0.3s',
                            }} onMouseEnter={(e) => e.currentTarget.style.background = '#138496'}
                                onMouseLeave={(e) => e.currentTarget.style.background = '#17a2b8'}>
                                Profile
                            </Link>
                            <button
                                onClick={handleLogout}
                                style={{
                                    background: '#dc3545',
                                    color: 'white',
                                    border: 'none',
                                    padding: '10px 20px',
                                    borderRadius: '8px',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: 'all 0.3s',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = '#c82333'}
                                onMouseLeave={(e) => e.currentTarget.style.background = '#dc3545'}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/register" style={{
                                textDecoration: 'none',
                                background: '#28a745',
                                color: 'white',
                                padding: '10px 20px',
                                borderRadius: '8px',
                                fontWeight: 600,
                                transition: 'all 0.3s',
                            }} onMouseEnter={(e) => e.currentTarget.style.background = '#218838'}
                                onMouseLeave={(e) => e.currentTarget.style.background = '#28a745'}>
                                Register
                            </Link>
                            <Link to="/login" style={{
                                textDecoration: 'none',
                                background: '#007bff',
                                color: 'white',
                                padding: '10px 20px',
                                borderRadius: '8px',
                                fontWeight: 600,
                                transition: 'all 0.3s',
                            }} onMouseEnter={(e) => e.currentTarget.style.background = '#0056b3'}
                                onMouseLeave={(e) => e.currentTarget.style.background = '#007bff'}>
                                Login
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
