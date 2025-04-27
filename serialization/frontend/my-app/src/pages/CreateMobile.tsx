import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateMobile = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        price: '',
        ram: '',
        storage: '',
        camera: '',
        battery: '',
        processor: '',
        image_url: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                price: parseFloat(formData.price),
                ram: parseInt(formData.ram),
                storage: parseInt(formData.storage),
                battery: parseInt(formData.battery),
                image_url: formData.image_url || null
            };
            const token = localStorage.getItem('token');
            await axios.post('http://127.0.0.1:8000/create/', payload, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            toast.success('Mobile added successfully!');
            navigate('/');
        } catch (error) {
            toast.error('Failed to add mobile. Please check your input.');
            console.error('Error creating mobile:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #ece9f7 0%, #f5f7fa 100%)',
            padding: '40px 0',
            animation: 'fadeIn 0.5s ease-in-out'
        }}>
            <style>
                {`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                `}
            </style>
            <div className="mobile-card" style={{
                maxWidth: '600px',
                margin: '0 auto',
                padding: '32px',
                borderRadius: '22px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                background: 'rgba(255,255,255,0.8)',
                backdropFilter: 'blur(10px)',
                animation: 'fadeIn 0.5s ease-in-out'
            }}>
                <h1 style={{
                    textAlign: 'center',
                    fontWeight: 700,
                    fontSize: '2rem',
                    marginBottom: '32px',
                    color: '#333'
                }}>Add New Mobile</h1>

                <form onSubmit={handleSubmit}>
                    {[
                        { name: 'name', label: 'Name', type: 'text' },
                        { name: 'brand', label: 'Brand', type: 'text' },
                        { name: 'price', label: 'Price', type: 'number' },
                        { name: 'ram', label: 'RAM (GB)', type: 'number' },
                        { name: 'storage', label: 'Storage (GB)', type: 'number' },
                        { name: 'camera', label: 'Camera', type: 'text' },
                        { name: 'battery', label: 'Battery (mAh)', type: 'number' },
                        { name: 'processor', label: 'Processor', type: 'text' },
                        { name: 'image_url', label: 'Image URL', type: 'text' }
                    ].map((field) => (
                        <div key={field.name} style={{ marginBottom: '20px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '8px',
                                color: '#444',
                                fontWeight: 500
                            }}>
                                {field.label}
                            </label>
                            <input
                                type={field.type}
                                name={field.name}
                                value={formData[field.name as keyof typeof formData]}
                                onChange={handleChange}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(255,255,255,0.3)',
                                    background: 'rgba(255,255,255,0.4)',
                                    backdropFilter: 'blur(8px)',
                                    fontSize: '1rem',
                                    transition: 'all 0.3s'
                                }}
                                required={field.name !== 'image_url'}
                            />
                        </div>
                    ))}

                    <button type="submit" style={{
                        width: '100%',
                        padding: '14px',
                        borderRadius: '12px',
                        border: 'none',
                        background: '#4e54c8',
                        color: 'white',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                    }} onMouseEnter={(e) => e.currentTarget.style.background = '#3b3fc8'}
                        onMouseLeave={(e) => e.currentTarget.style.background = '#4e54c8'}>
                        Add Mobile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateMobile;
