"use client"
import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import {
    CheckSquare,
    Bell,
    Settings,
    User,
    Search,
    Sun,
    Moon,
    Menu,
    ChevronDown,
    Heart,
    Bookmark,
    LogOut
} from 'lucide-react';
import { useTheme } from '../context/context';
import { SmileOutlined } from "@ant-design/icons";
import { notification } from "antd";

// Constants
const USER_DATA = {
    name: 'John Doe',
    email: 'john@example.com',
    initials: 'JD'
} as const;

// Custom hooks
const useClickOutside = (ref: React.RefObject<HTMLElement>, handler: () => void) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                handler();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [ref, handler]);
};

const useNotification = () => {
    const [api, contextHolder] = notification.useNotification();

    const openNotification = useCallback(() => {
        api.open({
            message: 'Task Reminder',
            description: 'You have 3 pending tasks due today. Don\'t forget to complete them!',
            icon: <SmileOutlined style={{ color: '#3b82f6' }} />,
            placement: 'topRight',
            duration: 4.5,
        });
    }, [api]);

    return { openNotification, contextHolder };
};

// Theme-aware styles
const getThemeStyles = (theme: 'light' | 'dark') => ({
    header: theme === 'dark'
        ? 'bg-slate-900/95 border-slate-700/50'
        : 'bg-white/95 border-slate-200/30 shadow-sm',

    searchBar: theme === 'dark'
        ? 'bg-slate-800/60 border-slate-700/50'
        : 'bg-slate-50/80 border-slate-200/50',

    button: theme === 'dark'
        ? 'text-slate-400 hover:text-white hover:bg-slate-800/60'
        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100/80',

    userProfile: theme === 'dark'
        ? 'bg-slate-800/60 hover:bg-slate-700/60 border-slate-700/50'
        : 'bg-gradient-to-r from-blue-50/80 to-indigo-50/80 hover:from-blue-100/80 hover:to-indigo-100/80 border-blue-200/50 shadow-sm',

    dropdown: theme === 'dark'
        ? 'bg-slate-800/95 border-slate-700'
        : 'bg-white/95 border-slate-200 shadow-xl',

    dropdownItem: theme === 'dark'
        ? 'hover:bg-slate-700 text-slate-200'
        : 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 text-slate-700',

    text: {
        primary: theme === 'dark' ? 'text-white' : 'text-slate-900',
        secondary: theme === 'dark' ? 'text-slate-400' : 'text-slate-600',
        accent: theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
    }
});

const Header: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const { openNotification, contextHolder } = useNotification();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const styles = useMemo(() => getThemeStyles(theme), [theme]);

    useClickOutside(dropdownRef, () => setIsDropdownOpen(false));

    const handleDropdownToggle = useCallback(() => {
        setIsDropdownOpen(prev => !prev);
    }, []);

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    }, []);

    const menuItems = useMemo(() => [
        { icon: User, label: 'Profile', action: () => console.log('Profile clicked') },
        { icon: Settings, label: 'Settings', action: () => console.log('Settings clicked') },
        { icon: Heart, label: 'Favorites', action: () => console.log('Favorites clicked') },
        { icon: Bookmark, label: 'Bookmarks', action: () => console.log('Bookmarks clicked') },
    ], []);

    const handleMenuItemClick = useCallback((action: () => void) => {
        action();
        setIsDropdownOpen(false);
    }, []);

    const SearchInput = ({ isMobile = false }: { isMobile?: boolean }) => (
        <div className={`${isMobile ? 'md:hidden mt-4' : 'hidden md:flex'} items-center ${styles.searchBar} backdrop-blur-sm rounded-xl px-4 py-2.5 ${isMobile ? '' : 'max-w-md flex-1 mx-8'} border transition-all duration-300`}>
            <Search className={`h-5 w-5 mr-3 ${styles.text.secondary} transition-colors duration-300`} />
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search todos..."
                className={`bg-transparent flex-1 outline-none transition-colors duration-300 ${styles.text.primary} placeholder-slate-400`}
            />
        </div>
    );

    return (
        <>
            <header className={`${styles.header} backdrop-blur-lg border-b px-4 sm:px-6 py-4 sticky top-0 z-50 transition-all duration-300`}>
                <div className="flex items-center justify-between max-w-7xl mx-auto">

                    {/* Logo Section */}
                    <div className="flex items-center space-x-3">
                        <div className={`gradient-primary p-2 rounded-xl shadow-lg ${
                            theme === 'light' ? 'shadow-blue-300/30' : ''
                        }`}>
                            <CheckSquare className="h-6 w-6 text-white" />
                        </div>
                        <div className="hidden sm:block">
                            <h1 className={`text-xl font-bold ${styles.text.primary} transition-colors duration-300`}>
                                TodoMaster
                            </h1>
                            <p className={`text-sm ${styles.text.secondary} transition-colors duration-300`}>
                                Stay organized, stay productive
                            </p>
                        </div>
                    </div>

                    {/* Desktop Search */}
                    <SearchInput />

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2 sm:space-x-3">

                        {/* Mobile Search Toggle */}
                        <button className={`md:hidden p-2 rounded-lg btn-hover transition-all duration-200 ${styles.button}`}>
                            <Search className="h-5 w-5" />
                        </button>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className={`p-2 rounded-lg btn-hover transition-all duration-200 ${styles.button}`}
                            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                        </button>

                        {/* Notifications */}
                        <button
                            onClick={openNotification}
                            className={`relative p-2 rounded-lg btn-hover transition-all duration-200 ${styles.button}`}
                            aria-label="View notifications"
                        >
                            <Bell className="h-5 w-5" />
                            <span className="absolute -top-1 -right-1 h-3 w-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse shadow-lg" />
                        </button>

                        {/* Settings */}
                        <button className={`hidden sm:flex p-2 rounded-lg btn-hover transition-all duration-200 ${styles.button}`}>
                            <Settings className="h-5 w-5" />
                        </button>

                        {/* User Profile Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={handleDropdownToggle}
                                className={`flex items-center space-x-3 backdrop-blur-sm rounded-xl px-3 py-2 cursor-pointer transition-all duration-300 border ${styles.userProfile}`}
                                aria-expanded={isDropdownOpen}
                                aria-haspopup="true"
                            >
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                                    {USER_DATA.initials}
                                </div>
                                <div className="hidden sm:flex flex-col items-start">
                                    <span className={`text-sm font-semibold ${styles.text.primary}`}>
                                        {USER_DATA.name}
                                    </span>
                                    <span className={`text-xs ${styles.text.secondary}`}>
                                        {USER_DATA.email}
                                    </span>
                                </div>
                                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                                    isDropdownOpen ? 'rotate-180' : ''
                                } ${styles.text.accent}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="absolute top-full right-0 mt-2 w-64 z-50 animate-slideInRight">
                                    <div className={`rounded-2xl border backdrop-blur-sm overflow-hidden ${styles.dropdown}`}>
                                        <div className="p-2">
                                            {menuItems.map((item, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => handleMenuItemClick(item.action)}
                                                    className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${styles.dropdownItem}`}
                                                >
                                                    <div className={`p-2 rounded-lg mr-3 ${
                                                        theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'
                                                    }`}>
                                                        <item.icon className="w-4 h-4" />
                                                    </div>
                                                    <span className="font-medium">{item.label}</span>
                                                </button>
                                            ))}
                                        </div>

                                        <div className={`mx-2 border-t ${
                                            theme === 'dark' ? 'border-slate-700' : 'border-slate-200'
                                        }`} />

                                        <div className="p-2">
                                            <button
                                                onClick={() => handleMenuItemClick(() => console.log('Sign out'))}
                                                className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                                                    theme === 'dark'
                                                        ? 'hover:bg-red-900/20 text-red-400'
                                                        : 'hover:bg-red-50 text-red-600'
                                                }`}
                                            >
                                                <div className={`p-2 rounded-lg mr-3 ${
                                                    theme === 'dark' ? 'bg-red-900/20' : 'bg-red-100'
                                                }`}>
                                                    <LogOut className="w-4 h-4" />
                                                </div>
                                                <span className="font-medium">Sign out</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu */}
                        <button className={`sm:hidden p-2 rounded-lg btn-hover transition-all duration-200 ${styles.button}`}>
                            <Menu className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Mobile Search */}
                <SearchInput isMobile />
            </header>
            {contextHolder}
        </>
    );
};

export default Header;