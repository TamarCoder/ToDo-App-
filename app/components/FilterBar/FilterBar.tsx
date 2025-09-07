import React from 'react';
import { Filter, SortAsc, Grid, List, CheckSquare, Clock, AlertTriangle, Calendar } from 'lucide-react';

const FilterBar: React.FC = () => {
    return (
        <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50 shadow-lg animate-fadeInUp">
            <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">

                {/* Left Section - Status Filters */}
                <div className="flex flex-wrap gap-2">
                    <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium btn-hover">
                        <Grid className="h-4 w-4" />
                        ყველა (8)
                    </button>

                    <button className="flex items-center gap-2 bg-gray-700/50 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-600/50 btn-hover border border-gray-600/50">
                        <Clock className="h-4 w-4" />
                        აქტიური (5)
                    </button>

                    <button className="flex items-center gap-2 bg-gray-700/50 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-600/50 btn-hover border border-gray-600/50">
                        <CheckSquare className="h-4 w-4" />
                        დასრულებული (3)
                    </button>

                    <button className="flex items-center gap-2 bg-gray-700/50 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-600/50 btn-hover border border-gray-600/50">
                        <AlertTriangle className="h-4 w-4" />
                        ვადაგადაცილებული (2)
                    </button>
                </div>

                {/* Right Section - Controls */}
                <div className="flex flex-wrap gap-3 items-center">

                    {/* Priority Filter */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">პრიორიტეტი:</span>
                        <select className="bg-gray-700/50 border border-gray-600/50 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20">
                            <option value="">ყველა</option>
                            <option value="high">მაღალი</option>
                            <option value="medium">საშუალო</option>
                            <option value="low">დაბალი</option>
                        </select>
                    </div>

                    {/* Category Filter */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">კატეგორია:</span>
                        <select className="bg-gray-700/50 border border-gray-600/50 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20">
                            <option value="">ყველა</option>
                            <option value="work">💼 სამუშაო</option>
                            <option value="personal">🏠 პირადი</option>
                            <option value="shopping">🛒 შოპინგი</option>
                            <option value="health">🏥 ჯანმრთელობა</option>
                            <option value="education">📚 განათლება</option>
                        </select>
                    </div>

                    {/* Sort Dropdown */}
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 bg-gray-700/50 text-gray-300 px-3 py-2 rounded-lg hover:bg-gray-600/50 btn-hover border border-gray-600/50">
                            <SortAsc className="h-4 w-4" />
                            <span className="text-sm">სორტირება</span>
                        </button>
                    </div>

                    {/* View Toggle */}
                    <div className="flex items-center bg-gray-700/50 rounded-lg p-1 border border-gray-600/50">
                        <button className="p-2 text-white bg-blue-600 rounded-lg btn-hover">
                            <List className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-600/50 rounded-lg btn-hover">
                            <Grid className="h-4 w-4" />
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
                        <span className="text-sm text-gray-400">ვადა:</span>
                        <select className="bg-gray-700/50 border border-gray-600/50 rounded-lg px-3 py-1.5 text-white text-sm focus:border-blue-500">
                            <option value="">ყველა</option>
                            <option value="today">დღეს</option>
                            <option value="tomorrow">ხვალ</option>
                            <option value="this-week">ამ კვირაში</option>
                            <option value="next-week">მომავალ კვირაში</option>
                            <option value="overdue">ვადაგადაცილებული</option>
                        </select>
                    </div>

                    {/* Tags Filter */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">თეგები:</span>
                        <div className="flex flex-wrap gap-1">
              <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full text-xs border border-blue-500/30 cursor-pointer hover:bg-blue-500/30 transition-colors">
                #სწრაფი
              </span>
                            <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded-full text-xs border border-green-500/30 cursor-pointer hover:bg-green-500/30 transition-colors">
                #მნიშვნელოვანი
              </span>
                            <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs border border-purple-500/30 cursor-pointer hover:bg-purple-500/30 transition-colors">
                #განათლება
              </span>
                        </div>
                    </div>

                    {/* Clear Filters */}
                    <button className="text-sm text-gray-400 hover:text-white underline ml-auto">
                        ფილტრების გასუფთავება
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-4 pt-4 border-t border-gray-700/50">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-white">8</div>
                        <div className="text-xs text-gray-400">სულ</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">5</div>
                        <div className="text-xs text-gray-400">აქტიური</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">3</div>
                        <div className="text-xs text-gray-400">დასრულებული</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-red-400">2</div>
                        <div className="text-xs text-gray-400">ვადაგადაცილებული</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;