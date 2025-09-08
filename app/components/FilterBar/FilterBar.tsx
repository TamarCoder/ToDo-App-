"use client"
import React, {useState} from 'react';
import {SortAsc, Grid, List, CheckSquare, Clock, AlertTriangle, Calendar } from 'lucide-react';
import {useTheme} from "../context/context";
import {CategoryType, CreateTodoInput, FilterState, useTodoStore} from "../../ZustandStore/TodoContext";

const FilterBar: React.FC = () => {

    const {theme} = useTheme();

    const filter = useTodoStore(state => state.filterState)
    const setFilter = useTodoStore(state => state.filterState)
    const clearCompleted = useTodoStore(state => state.filterState)

    return (
        <div className={`bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 border  shadow-lg animate-fadeInUp
          ${ theme === 'dark' ? 'bg-slate-900' : 'bg-white'}
        `}>

            <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">

                {/* Left Section - Status Filters */}
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setFilter(setFilter.status)}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium btn-hover">
                        <Grid className="h-4 w-4" />
                        All
                    </button>

                    <button className="flex items-center gap-2 bg-yellow-500 text-gray-100 px-4 py-2 rounded-lg hover:bg-yellow-500 btn-hover border border-yellow-600/50">
                        <Clock className="h-4 w-4" />
                        Action (5)
                    </button>

                    <button className="flex items-center gap-2 bg-green-400 text-gray-100 px-4 py-2 rounded-lg hover:bg-green-400/50 btn-hover border border-green-600/50">
                        <CheckSquare className="h-4 w-4" />
                        Finished (3)
                    </button>

                    <button className="flex items-center gap-2 bg-red-500 text-gray-100 px-4 py-2 rounded-lg hover:bg-red-600/50 btn-hover border border-red-600/50">
                        <AlertTriangle className="h-4 w-4" />
                        Overdue (2)
                    </button>
                </div>

                {/* Right Section - Controls */}
                <div className="flex flex-wrap gap-3 items-center">

                    {/* Priority Filter */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">Priority:</span>
                        <select className="bg-blue-600  border border-blue-600/50 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20">
                            <option value="">All</option>
                            <option value="high">Hight</option>
                            <option value="medium">Medum</option>
                            <option value="low">Low</option>
                        </select>
                    </div>

                    {/* Category Filter */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">Category:</span>
                        <select className="bg-blue-600  border border-blue-600/50 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20">
                            <option value="">All</option>
                            <option value="General">💼 General</option>
                            <option value="personal">🏠 Personal</option>
                            <option value="Developers">🛒 Developers</option>
                            <option value="Desing">🏥 Desing</option>
                        </select>
                    </div>

                    {/* Sort Dropdown */}
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 bg-blue-600 text-gray-300 px-3 py-2 rounded-lg hover:bg-blue-600/50 btn-hover border border-blue-600/50">
                            <SortAsc className="h-4 w-4" />
                            <span className="text-sm">Sort</span>
                        </button>
                    </div>

                    {/* View Toggle */}
                    <div className="flex items-center  gap-[10px]  rounded-lg p-1 border border-gray-600/50">
                        <button className="p-2 text-white bg-blue-600 rounded-lg btn-hover">
                            <List className="h-5 w-5" />
                        </button>

                        <button className="p-2 text-gray-400 hover:text-white border border-blue-500   hover:bg-blue-600/50 rounded-lg btn-hover">
                            <Grid className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Advanced Filters (Expandable Section) */}
            <div className="mt-4 pt-4 border-t border-gray-700/50">
                <div className="flex flex-wrap gap-3 items-center">

                    {/* Date Range */}
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-400">Data:</span>
                        <select className="bg-gray-700/50 border border-gray-600/50 rounded-lg px-3 py-1.5 text-white text-sm focus:border-blue-500">
                            <option value="">All</option>
                            <option value="today">Today</option>
                            <option value="tomorrow">Tomorow</option>
                            <option value="this-week">This week</option>
                            <option value="next-week">Month</option>
                            <option value="overdue">Overdue</option>
                        </select>
                    </div>

                    {/* Tags Filter */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">Tegs:</span>
                        <div className="flex flex-wrap gap-1">
              <span className="bg-blue-600 text-blue-100 px-2 py-1 rounded-full text-xs border border-blue-800 cursor-pointer hover:bg-blue-800 transition-colors">
                #Fats
              </span>
                            <span className="bg-green-500 text-green-100 px-2 py-1 rounded-full text-xs border border-green-800 cursor-pointer hover:bg-green-800 transition-colors">
                #Important
              </span>
                            <span className="bg-purple-500 text-purple-100 px-2 py-1 rounded-full text-xs border border-purple-800 cursor-pointer hover:bg-purple-800 transition-colors">
                #Developers
              </span>
                            <span className="bg-yellow-500 text-yellow-100 px-2 py-1 rounded-full text-xs border border-yellow-800 cursor-pointer hover:bg-yellow-800 transition-colors">
                #Desing
              </span>

                        </div>
                    </div>

                    {/* Clear Filters */}
                    <button className="text-[17px] text-black hover:text-blue-600 underline ml-auto">
                        Clear filter
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-4 pt-4 border-t border-gray-700/50">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600 ">8</div>
                        <div className="text-xs text-black">All</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">5</div>
                        <div className="text-xs text-gray-400">Action</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">3</div>
                        <div className="text-xs text-gray-400">Finished</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-red-400">2</div>
                        <div className="text-xs text-gray-400">Overdue</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;