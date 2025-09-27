import Link from 'next/link';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon, UserIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import LoginModal from '../Auth/LoginModal';
import RegisterModal from '../Auth/RegisterModal';
import GlobalSearch from '../Search/GlobalSearch';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  const navigation = [
    { name: 'Tutorials', href: '/tutorials' },
    { name: 'Certifications', href: '/certifications' },
    { name: 'Projects', href: '/projects' },
    { name: 'Interview Q&A', href: '/interview' },
    { name: 'Blog', href: '/blog' },
    { name: 'Forum', href: '/forum' },
  ];

  const handleLogin = async (email: string, password: string) => {
    // In real app, this would authenticate with backend
    console.log('Login:', email, password);
    setUser({ name: email.split('@')[0], email });
    setIsLoggedIn(true);
    setIsLoginModalOpen(false);
  };

  const handleRegister = async (userData: any) => {
    // In real app, this would register with backend
    console.log('Register:', userData);
    setUser({ name: userData.name, email: userData.email });
    setIsLoggedIn(true);
    setIsRegisterModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <div className="text-2xl font-bold text-pega-blue">
                PegaStack
                <span className="text-pega-accent">.com</span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-gray-700 hover:text-pega-blue px-3 py-2 text-sm font-medium transition-colors flex items-center space-x-1"
            >
              <MagnifyingGlassIcon className="w-4 h-4" />
              <span>Search</span>
            </button>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-pega-blue px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard" className="text-gray-700 hover:text-pega-blue px-3 py-2 text-sm font-medium transition-colors">
                  Dashboard
                </Link>
                <div className="flex items-center space-x-2">
                  <UserIcon className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-700">{user?.name}</span>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-gray-500 hover:text-gray-700 ml-2"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="text-gray-700 hover:text-pega-blue px-3 py-2 text-sm font-medium transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsRegisterModalOpen(true)}
                  className="btn-primary text-sm"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-pega-blue"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            <button
              onClick={() => {
                setIsSearchOpen(true);
                setIsOpen(false);
              }}
              className="text-gray-700 hover:text-pega-blue block px-3 py-2 text-base font-medium w-full text-left flex items-center space-x-2"
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
              <span>Search</span>
            </button>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-pega-blue block px-3 py-2 text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {isLoggedIn ? (
              <div className="space-y-2 mt-3">
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-pega-blue block px-3 py-2 text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-sm text-gray-700">{user?.name}</span>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2 mt-3">
                <button
                  onClick={() => {
                    setIsLoginModalOpen(true);
                    setIsOpen(false);
                  }}
                  className="btn-secondary w-full"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setIsRegisterModalOpen(true);
                    setIsOpen(false);
                  }}
                  className="btn-primary w-full"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Authentication Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
        onSwitchToRegister={() => {
          setIsLoginModalOpen(false);
          setIsRegisterModalOpen(true);
        }}
      />
      
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onRegister={handleRegister}
        onSwitchToLogin={() => {
          setIsRegisterModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />
      
      <GlobalSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
