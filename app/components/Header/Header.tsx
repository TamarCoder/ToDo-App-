"use client"
import React, {useEffect, useRef, useState} from 'react';
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
import {useTheme} from '../context/context';
import {SmileOutlined} from "@ant-design/icons";
import {notification} from "antd";


const Header: React.FC = () => {
    const {theme, toggleTheme} = useTheme();
    const [api, contextHolder] = notification.useNotification();

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const openNotification = () => {
        api.open({
            message: 'Notification Title',
            description:
                'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
            icon: <SmileOutlined style={{color: '#108ee9'}}/>,
        });
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);


    const menuItems = [
        {icon: User, label: 'Profile', shortcut: '⌘P', badge: null},
        {icon: Settings, label: 'Settings', shortcut: '⌘S', badge: null},
        {icon: Heart, label: 'Favorites', shortcut: '⌘F', badge: null},
        {icon: Bookmark, label: 'Bookmarks', shortcut: '⌘B', badge: null},
    ];

    return (
        <>
            <header className={`${
                theme === 'dark'
                    ? 'bg-gray-900/90 border-gray-700/50'
                    : 'bg-white/90 border-gray-200/50 shadow-sm'
            } backdrop-blur-lg border-b px-4 sm:px-6 py-4 sticky top-0 z-50 transition-all duration-300`}>

                <div className="flex items-center justify-between max-w-7xl mx-auto">

                    {/* Logo and Title */}
                    <div className="flex items-center space-x-3">
                        <div className={`gradient-primary p-2 rounded-xl shadow-lg ${
                            theme === 'light' ? 'shadow-blue-200/50' : ''
                        }`}>
                            <CheckSquare className="h-6 w-6 text-white"/>
                        </div>
                        <div className="hidden sm:block">
                            <h1 className={`text-xl font-bold ${
                                theme === 'dark' ? 'text-white' : 'text-gray-900'
                            } transition-colors duration-300`}>
                                TodoMaster
                            </h1>
                            <p className={`text-sm ${
                                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            } transition-colors duration-300`}>
                                Stay organized, stay productive
                            </p>
                        </div>
                    </div>

                    {/* Search Bar - Desktop */}
                    <div className={`hidden md:flex items-center ${
                        theme === 'dark'
                            ? 'bg-gray-800/60 border-gray-700/50'
                            : 'bg-gray-50/80 border-gray-300/50'
                    } backdrop-blur-sm rounded-xl px-4 py-2.5 max-w-md flex-1 mx-8 border transition-all duration-300`}>
                        <Search className={`h-5 w-5 mr-3 ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        } transition-colors duration-300`}/>
                        <input
                            type="text"
                            placeholder="Search todos..."
                            className={`bg-transparent flex-1 outline-none transition-colors duration-300 ${
                                theme === 'dark'
                                    ? 'text-white placeholder-gray-400'
                                    : 'text-gray-900 placeholder-gray-500'
                            }`}
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 sm:space-x-3">

                        {/* Mobile Search Button */}
                        <button className={`md:hidden p-2 rounded-lg btn-hover transition-all duration-200 ${
                            theme === 'dark'
                                ? 'text-gray-400 hover:text-white hover:bg-gray-800/60'
                                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/80'
                        }`}>
                            <Search className="h-5 w-5"/>
                        </button>

                        {/* Theme Toggle */}
                        <button
                            className={`p-2 rounded-lg btn-hover transition-all duration-200 ${
                                theme === 'dark'
                                    ? 'text-gray-400 hover:text-white hover:bg-gray-800/60'
                                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/80'
                            }`}
                            onClick={toggleTheme}
                            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                        >
                            {theme === 'light' ? (
                                <Moon className="h-5 w-5"/>
                            ) : (
                                <Sun className="h-5 w-5"/>
                            )}
                        </button>

                        {/* Notifications */}
                        <button className={`relative p-2 rounded-lg btn-hover transition-all duration-200 ${
                            theme === 'dark'
                                ? 'text-gray-400 hover:text-white hover:bg-gray-800/60'
                                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/80'
                        }`} onClick={openNotification}>
                            <Bell className="h-5 w-5"/>
                            <span
                                className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse shadow-lg"></span>
                        </button>

                        {/* Settings */}
                        <button className={`hidden sm:flex p-2 rounded-lg btn-hover transition-all duration-200 ${
                            theme === 'dark'
                                ? 'text-gray-400 hover:text-white hover:bg-gray-800/60'
                                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/80'
                        }`}>
                            <Settings className="h-5 w-5"/>
                        </button>

                        {/* User Profile */}
                        {/* User Profile */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className={`flex items-center justify-start space-x-2 backdrop-blur-sm rounded-lg px-3 py-2 cursor-pointer transition-all duration-300 border ${
                                    theme === 'dark'
                                        ? 'bg-gray-800/60 hover:bg-gray-700/60 border-gray-700/50'
                                        : 'bg-gray-50/80 hover:bg-gray-100/80 border-gray-300/50 shadow-sm'
                                }`}
                            >
                                <div
                                    className="w-7 h-7 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                                    JD
                                </div>
                                <div className="flex flex-col items-start">
                                    <div
                                        className={`text-sm hidden sm:block font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                                        style={{fontSize: '14px'}}>
                                        John Doe
                                    </div>
                                    <div
                                        className={`text-sm hidden sm:block font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                                        style={{fontSize: '14px'}}>
                                        john@example.com
                                    </div>
                                </div>
                                <ChevronDown
                                    className={`w-5 h-5 transition-transform duration-300 ${
                                        isOpen ? 'rotate-180' : ''
                                    } ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                                />
                            </button>

                            {/* Dropdown Content */}
                            {isOpen && (
                                <div className="absolute top-full right-0 mt-2 w-64 z-50">
                                    <div
                                        className={`rounded-2xl shadow-2xl border backdrop-blur-sm overflow-hidden ${
                                            theme === 'dark'
                                                ? 'bg-gray-800/95 border-gray-700 text-white'
                                                : 'bg-white/95 border-gray-200 text-gray-900'
                                        }`}
                                    >
                                        <div className="p-2">
                                            {menuItems.map((item, index) => (
                                                <button
                                                    key={index}
                                                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                                                        theme === 'dark' ? 'hover:bg-gray-700 text-gray-200' : 'hover:bg-gray-100 text-gray-900'
                                                    }`}
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    <div className="flex items-center space-x-3">
                                                        <div className={`p-2 rounded-lg transition-colors duration-200 ${
                                                            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                                                        }`}>
                                                            <item.icon className={`w-4 h-4 ${
                                                                theme === 'dark' ? 'text-white' : 'text-gray-900'
                                                            }`}/>
                                                        </div>
                                                        <span className="font-medium">{item.label}</span>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>

                                        <div className={`mx-2 border-t ${
                                            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                                        }`}/>

                                        <div className="p-2">
                                            <button
                                                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                                                    theme === 'dark' ? 'hover:bg-red-900/20 text-red-400' : 'hover:bg-red-50 text-red-600'
                                                }`}
                                                onClick={() => setIsOpen(false)}
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <div className={`p-2 rounded-lg transition-colors duration-200 ${
                                                        theme === 'dark'
                                                            ? 'bg-red-900/20 group-hover:bg-red-900/30'
                                                            : 'bg-red-100 group-hover:bg-red-200'
                                                    }`}>
                                                        <LogOut className="w-4 h-4"/>
                                                    </div>
                                                    <span className="font-medium">Sign out</span>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu */}
                        <button className={`sm:hidden p-2 rounded-lg btn-hover transition-all duration-200 ${
                            theme === 'dark'
                                ? 'text-gray-400 hover:text-white hover:bg-gray-800/60'
                                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/80'
                        }`}>
                            <Menu className="h-5 w-5"/>
                        </button>
                    </div>
                </div>

                {/* Mobile Search Bar */}
                <div className="md:hidden mt-4">
                    <div
                        className={`flex items-center backdrop-blur-sm rounded-xl px-4 py-2.5 border transition-all duration-300 ${
                            theme === 'dark'
                                ? 'bg-gray-800/60 border-gray-700/50'
                                : 'bg-gray-50/80 border-gray-300/50'
                        }`}>
                        <Search className={`h-5 w-5 mr-3 transition-colors duration-300 ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}/>
                        <input
                            type="text"
                            placeholder="Search todos..."
                            className={`bg-transparent flex-1 outline-none transition-colors duration-300 ${
                                theme === 'dark'
                                    ? 'text-white placeholder-gray-400'
                                    : 'text-gray-900 placeholder-gray-500'
                            }`}
                        />
                    </div>
                </div>
            </header>
            {contextHolder}
        </>
    );
};

export default Header;