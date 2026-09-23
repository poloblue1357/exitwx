import { ArrowLeft, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

function Header({ title, showBackButton = false, subtitle = null }) {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);
    const [showMenu, setShowMenu] = useState(false);

    return (
        <header className="bg-black/20 backdrop-blur-sm text-white p-4 shadow-lg" style={{ position: 'relative', zIndex: 50 }}>
        <div className="flex items-center justify-between max-w-md mx-auto">
            {showBackButton ? (
            <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
                <ArrowLeft className="w-6 h-6" />
            </button>
            ) : (
            <div className="w-10"></div>
            )}
        
            <div className="text-center">
            <h1 className="text-xl font-semibold tracking-wide">
                {title || 'ExitWx'}
            </h1>
            {subtitle && (
                <p className="text-blue-100 text-sm mt-1 font-light tracking-wider">
                {subtitle}
                </p>
            )}
            </div>
        
            {user ? (
                <div style={{ position: 'relative' }}>
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <User className="w-6 h-6" />
                    </button>
                    
                    {showMenu && (
                        <div style={{
                            position: 'absolute',
                            right: 0,
                            top: '100%',
                            background: '#1C1C1E',
                            borderRadius: '12px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            minWidth: '200px',
                            zIndex: 1000,
                            boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                            marginTop: '8px'
                        }}>
                            <div style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', margin: 0 }}>Logged in as</p>
                                <p style={{ fontSize: '14px', color: 'white', margin: '4px 0 0 0', fontWeight: 600 }}>
                                    {user.username}
                                </p>
                                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', margin: '4px 0 0 0' }}>
                                    {user.email}
                                </p>
                            </div>
                            
                            <button
                                onClick={() => {
                                    logout();
                                    setShowMenu(false);
                                    navigate('/');
                                }}
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#FF453A',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    transition: 'background 0.2s'
                                }}
                                onMouseEnter={(e) => e.target.style.background = 'rgba(255,69,58,0.1)'}
                                onMouseLeave={(e) => e.target.style.background = 'transparent'}
                            >
                                <LogOut size={16} />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="w-10"></div>
            )}
        </div>
        </header>
    );
}

export default Header;