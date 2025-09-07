import React from 'react';
import { TrendingUp, TrendingDown, CheckCircle, Clock, AlertTriangle, Calendar, Target, Award } from 'lucide-react';
import {useTheme} from "../context/context";

const StatsCard: React.FC = () => {
    const { theme } = useTheme();

    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 ${
            theme === 'dark' ? 'bg-slate-900' : 'bg-white'
             }`}>

            {/* Total Tasks */}
            <div className={`rounded-2xl p-6 cursor-pointer  hover:border-blue-500  shadow-lg animate-fadeInUp transition-all duration-300 backdrop-blur-sm border ${
                theme === 'dark'
                    ? 'bg-gray-800/60 border-gray-700/50 text-white'
                    : 'bg-white/90 border-gray-200/50 text-gray-900'
            }`}>
                <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${
                        theme === 'dark'
                            ? 'bg-blue-600/20 border border-blue-500/30'
                            : 'bg-blue-50 border border-blue-200'
                    }`}>
                        <CheckCircle className={`h-6 w-6 ${
                            theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                        }`} />
                    </div>
                    <div className={`flex items-center text-sm ${
                        theme === 'dark' ? 'text-green-400' : 'text-green-600'
                    }`}>
                        <TrendingUp className="h-4 w-4 mr-1" />
                        +12%
                    </div>
                </div>
                <h3 className={`text-2xl font-bold mb-1 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>24</h3>
                <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>Total Tasks</p>
                <div className={`mt-3 rounded-full h-2 ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                }`}>
                    <div className={`rounded-full h-2 w-3/4 ${
                        theme === 'dark' ? 'bg-blue-500' : 'bg-blue-600'
                    }`}></div>
                </div>
            </div>

            {/* Completed Tasks */}
            <div className={`rounded-2xl cursor-pointer hover:border-green-500 p-6 shadow-lg animate-fadeInUp transition-all duration-300 backdrop-blur-sm border ${
                theme === 'dark'
                    ? 'bg-gray-800/60 border-gray-700/50 text-white'
                    : 'bg-white/90 border-gray-200/50 text-gray-900'
            }`}style={{animationDelay: '0.1s'}} >
                <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${
                        theme === 'dark'
                            ? 'bg-green-600 border border-green-500/30'
                            : 'bg-green-50 border border-green-200'
                    }`}>
                        <Target className={`h-6 w-6 ${
                            theme === 'dark' ? 'text-green-100' : 'text-green-600'
                        }`}  />
                    </div>
                    <div className={`flex items-center text-sm ${
                        theme === 'dark' ? 'text-green-400' : 'text-green-600'
                    }`}>
                        <TrendingUp className="h-4 w-4 mr-1" />
                        +8%
                    </div>
                </div>
                <h3 className="text-2xl font-bold mb-1">18</h3>
                <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>Finished</p>
                <div className={`mt-3 rounded-full h-2 ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                }`}>
                    <div className={`rounded-full h-2 w-3/4 ${
                        theme === 'dark' ? 'bg-green-500' : 'bg-green-600'
                    }`}></div>
                </div>
            </div>


            {/* Current Tasks */}
            <div className={`rounded-2xl cursor-pointer hover:border-yellow-500 p-6 shadow-lg animate-fadeInUp transition-all duration-300 backdrop-blur-sm border ${
                theme === 'dark'
                    ? 'bg-gray-800/60 border-gray-700/50 text-white'
                    : 'bg-white/90 border-gray-200/50 text-gray-900'
            }`}style={{animationDelay: '0.1s'}} >
                <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${
                        theme === 'dark'
                            ? 'bg-yellow-600 border border-yellow-500/30'
                            : 'bg-yellow-50 border border-yellow-200'
                    }`}>
                        <Clock className={`h-6 w-6 ${
                            theme === 'dark' ? 'text-yellow-100' : 'text-yellow-600'
                        }`} />
                    </div>
                    <div className={`flex items-center text-sm ${
                        theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'
                    }`}>
                        <TrendingDown className="h-4 w-4 mr-1" />
                        -5%
                    </div>
                </div>
                <h3 className="text-2xl font-bold mb-1">6</h3>
                <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>Current</p>
                <div className={`mt-3 rounded-full h-2 ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                }`}>
                    <div className={`rounded-full h-2 w-3/4 ${
                        theme === 'dark' ? 'bg-yellow-500' : 'bg-yellow-600'
                    }`}></div>
                </div>
            </div>

            {/* Overdue Tasks */}
            <div className={`rounded-2xl p-6 cursor-pointer hover:border-red-500  shadow-lg animate-fadeInUp transition-all duration-300 backdrop-blur-sm border ${
                theme === 'dark'
                    ? 'bg-gray-800/60 border-gray-700/50 text-white'
                    : 'bg-white/90 border-gray-200/50 text-gray-900'
            }`}style={{animationDelay: '0.1s'}} >
                <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${
                        theme === 'dark'
                            ? 'bg-red-600 border border-red-500/30'
                            : 'bg-red-50 border border-red-200'
                    }`}>
                        <AlertTriangle className="h-6 w-6" />
                    </div>
                    <div className={`flex items-center text-sm ${
                        theme === 'dark' ? 'text-red-400' : 'text-red-600'
                    }`}>
                        <TrendingUp className="h-4 w-4 mr-1" />
                        +2
                    </div>
                </div>
                <h3 className="text-2xl font-bold mb-1">3</h3>
                <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>Overdue</p>
                <div className={`mt-3 rounded-full h-2 ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                }`}>
                    <div className={`rounded-full h-2 w-3/4 ${
                        theme === 'dark' ? 'bg-red-500' : 'bg-red-600'
                    }`}></div>
                </div>
            </div>

















        </div>



    )
}

export default StatsCard;