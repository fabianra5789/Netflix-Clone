import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Bell, 
  User, 
  Menu, 
  X, 
  Home,
  Tv,
  Film,
  Star,
  Bookmark,
  Settings,
  LogOut
} from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [notifications] = useState(3); // Número de notificaciones
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  const navItems = [
    { icon: Home, label: 'Inicio', path: '/' },
    { icon: Tv, label: 'Series', path: '/series' },
    { icon: Film, label: 'Películas', path: '/movies' },
    { icon: Star, label: 'Novedades', path: '/new' },
    { icon: Bookmark, label: 'Mi Lista', path: '/my-list' }
  ];

  return (
    <>
      <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
        <div className="header__content">
          <div className="header__left">
            <Link to="/" className="header__logo">
              <div className="logo-container">
                <span className="logo-text">NETFLIX</span>
                <div className="logo-glow"></div>
              </div>
            </Link>
            
            <nav className="header__nav">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link key={index} to={item.path} className="nav-link">
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
          
          <div className="header__right">
            {/* Search */}
            <div className={`search-container ${isSearchOpen ? 'search-open' : ''}`}>
              <button 
                className="search-toggle"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search size={20} />
              </button>
              
              <form onSubmit={handleSearch} className="search-form">
                <input
                  type="text"
                  placeholder="Títulos, personas, géneros..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <button type="button" className="search-close" onClick={() => setIsSearchOpen(false)}>
                  <X size={16} />
                </button>
              </form>
            </div>
            
            {/* Notifications */}
            <button className="notification-btn">
              <Bell size={20} />
              {notifications > 0 && (
                <span className="notification-badge">{notifications}</span>
              )}
            </button>
            
            {/* Profile Menu */}
            <div className="profile-menu">
              <button 
                className="profile-btn"
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              >
                <div className="profile-avatar">
                  <User size={20} />
                </div>
                <div className="profile-arrow"></div>
              </button>
              
              {isProfileMenuOpen && (
                <div className="profile-dropdown">
                  <div className="profile-info">
                    <div className="profile-avatar-large">
                      <User size={24} />
                    </div>
                    <div className="profile-details">
                      <span className="profile-name">Eric Ramirez</span>
                      <span className="profile-email">fabianra5789@gmail.com</span>
                    </div>
                  </div>
                  
                  <div className="profile-menu-items">
                    <Link to="/profile" className="menu-item">
                      <User size={16} />
                      <span>Gestionar Perfiles</span>
                    </Link>
                    <Link to="/account" className="menu-item">
                      <Settings size={16} />
                      <span>Cuenta</span>
                    </Link>
                    <Link to="/downloads" className="menu-item">
                      <Bookmark size={16} />
                      <span>Descargas</span>
                    </Link>
                    <div className="menu-divider"></div>
                    <button className="menu-item logout">
                      <LogOut size={16} />
                      <span>Cerrar Sesión</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-content">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link 
                  key={index} 
                  to={item.path} 
                  className="mobile-nav-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            
            <div className="mobile-menu-divider"></div>
            
            <Link to="/profile" className="mobile-nav-link">
              <User size={20} />
              <span>Perfil</span>
            </Link>
            <Link to="/settings" className="mobile-nav-link">
              <Settings size={20} />
              <span>Configuración</span>
            </Link>
          </div>
        </div>
      )}
      
      {/* Developer Credit */}
      <a 
        href="https://github.com/fabianra5789" 
        target="_blank" 
        rel="noopener noreferrer"
        className="developer-credit"
      >
        Desarrollado por <span className="dev-name">Eric Ramirez (Ericc.raw)</span>
      </a>
    </>
  );
};

export default Header;