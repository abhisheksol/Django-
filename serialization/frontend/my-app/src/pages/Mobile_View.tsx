import axios from 'axios'
import React, { useEffect, useState } from 'react'

// Type for mobile data
type Mobile = {
    id: number;
    name: string;
    brand: string;
    price: string;
    ram: number;
    storage: number;
    camera: string;
    battery: number;
    processor: string;
    image_url: string | null;
};

const Mobile_View = () => {
    const [mobiles, setMobiles] = useState<Mobile[]>([])
    const [loading, setLoading] = useState(true)
    const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});

    // Use a local image as fallback instead of placeholder.com
    const fallbackImage = "/mobile-placeholder.png"; // Add this image to your public folder

    useEffect(() => {
        const fetch = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get("http://127.0.0.1:8000/", {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });
                setMobiles(response.data);
            } catch (error) {
                console.error('Error fetching mobiles:', error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    const handleImageError = (mobileId: number) => {
        setImageErrors(prev => ({ ...prev, [mobileId]: true }));
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
            padding: '40px 0',
            position: 'relative',
            overflow: 'hidden',
            animation: 'fadeIn 0.5s ease-in-out'
        }}>
            <style>
                {`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .mobile-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
                    gap: 40px;
                    max-width: 1300px;
                    margin: 0 auto;
                    padding: 0 16px;
                }
                .mobile-card {
                    background: #fff;
                    border-radius: 20px;
                    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
                    padding: 32px 26px 24px 26px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    transition: transform 0.2s, box-shadow 0.2s;
                    cursor: pointer;
                    position: relative;
                }
                .mobile-card:hover {
                    transform: translateY(-8px) scale(1.03);
                    box-shadow: 0 16px 40px 0 rgba(31, 38, 135, 0.18);
                }
                .mobile-image-container {
                    width: 140px;
                    height: 140px;
                    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                    border-radius: 16px;
                    margin-bottom: 18px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    box-shadow: 0 2px 12px rgba(78,84,200,0.10);
                }
                .mobile-card img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    border-radius: 12px;
                    border: none;
                    background: transparent;
                    padding: 10px;
                }
                .mobile-title {
                    font-size: 1.4rem;
                    font-weight: 700;
                    margin: 0 0 8px 0;
                    color: #222;
                    letter-spacing: 0.5px;
                    text-align: center;
                }
                .mobile-brand {
                    font-size: 1rem;
                    color: #666;
                    margin-bottom: 8px;
                    font-weight: 500;
                    text-align: center;
                }
                .mobile-price {
                    font-weight: 700;
                    color: #f76b1c;
                    font-size: 1.15rem;
                    margin-bottom: 14px;
                    letter-spacing: 0.5px;
                    text-align: center;
                }
                .mobile-specs {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    width: 100%;
                    font-size: 1rem;
                    color: #444;
                    line-height: 1.7;
                }
                .mobile-specs li {
                    display: flex;
                    justify-content: space-between;
                    border-bottom: 1px solid #f0f0f0;
                    padding: 4px 0;
                }
                @media (max-width: 600px) {
                    .mobile-card {
                        padding: 18px 8px 14px 8px;
                    }
                    .mobile-image-container {
                        width: 90px;
                        height: 90px;
                    }
                }
                `}
            </style>
            <h1 style={{
                textAlign: 'center',
                fontWeight: 800,
                fontSize: '2.7rem',
                marginBottom: '38px',
                color: '#222',
                letterSpacing: '1px',
                textShadow: '0 2px 8px rgba(78,84,200,0.08)'
            }}>
                Mobile Phones
            </h1>
            {loading ? (
                <div style={{ textAlign: 'center', fontSize: '1.2rem' }}>
                    <div className="spinner-border text-warning" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="mobile-grid">
                    {mobiles.map((mobile, idx) => (
                        <div key={mobile.id} className="mobile-card">
                            <div className="mobile-image-container">
                                <img 
                                    src={imageErrors[mobile.id] ? fallbackImage : (mobile.image_url || fallbackImage)}
                                    alt={mobile.name} 
                                    onError={() => handleImageError(mobile.id)}
                                />
                            </div>
                            <h2 className="mobile-title">{mobile.name}</h2>
                            <div className="mobile-brand">{mobile.brand}</div>
                            <div className="mobile-price">₹{parseFloat(mobile.price).toLocaleString()}</div>
                            <ul className="mobile-specs">
                                <li><span><strong>RAM:</strong></span> <span>{mobile.ram} GB</span></li>
                                <li><span><strong>Storage:</strong></span> <span>{mobile.storage} GB</span></li>
                                <li><span><strong>Camera:</strong></span> <span>{mobile.camera}</span></li>
                                <li><span><strong>Battery:</strong></span> <span>{mobile.battery} mAh</span></li>
                                <li><span><strong>Processor:</strong></span> <span>{mobile.processor}</span></li>
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Mobile_View;