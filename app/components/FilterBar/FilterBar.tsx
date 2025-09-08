"use client"
import React, { useState, useMemo, useCallback } from 'react';
import { SortAsc, Grid, List, CheckSquare, Clock, AlertTriangle, Calendar } from 'lucide-react';
import { useTheme } from "../context/context";
import { CategoryType, FilterState, useTodoStore } from "../../ZustandStore/TodoContext";

// Types
interface FilterButtonProps {
    isActive: boolean;
    onClick: () => void;
    children: React.ReactNode;
    variant: 'all' | 'active' | 'completed' | 'overdue';
    theme: 'light' | 'dark';
    count: number;
}

interface TagProps {
    label: string;
    color: string;
    isActive?: boolean;
    onClick?: () => void;
}

// Constants
const FILTER_VARIANTS = {
    all: {
        active: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg',
        inactive: {
            dark: 'bg-slate-700/80 text-slate-300 hover:bg-slate-600/80 border border-slate-600/50',
            light: 'bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 hover:from-slate-200 hover:to-slate-300 border border-slate-300/50 shadow-sm'
        }
    },
    active: {
        active: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg',
        inactive: {
            dark: 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/30',
            light: 'bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 hover:from-amber-100 hover:to-orange-100 border border-amber-200/50 shadow-sm'
        }
    },
    completed: {
        active: 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg',
        inactive: {
            dark: 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30',
            light: 'bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 hover:from-emerald-100 hover:to-green-100 border border-emerald-200/50 shadow-sm'
        }
    },
    overdue: {
        active: 'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg',
        inactive: {
            dark: 'bg-red-500/20 text-red-300 hover:bg-red-500/30 border border-red-500/30',
            light: 'bg-gradient-to-r from-red-50 to-rose-50 text-red-700 hover:from-red-100 hover:to-rose-100 border border-red-200/50 shadow-sm'
        }
    }
} as const;

const TAG_COLORS = [
    { name: 'Fast', color: 'blue' },
    { name: 'Important', color: 'emerald' },
    { name: 'Developers', color: 'purple' },
    { name: 'Design', color: 'amber' },
] as const;

// Custom Hooks
const useFilterStyles = (theme: 'light' | 'dark') => useMemo(() => ({
    container: theme === 'dark'
        ? 'bg-slate-900/95 border-slate-700/50'
        : 'bg-white/95 border-slate-200/30 shadow-lg',

    select: theme === 'dark'
        ? 'bg-slate-700/80 border-slate-600/50 text-white'
        : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200/50 text-slate-700',

    dateSelect: theme === 'dark'
        ? 'bg-slate-700/50 border-slate-600/50 text-white'
        : 'bg-slate-50 border-slate-200 text-slate-700',

    text: {
        primary: theme === 'dark' ? 'text-white' : 'text-slate-900',
        secondary: theme === 'dark' ? 'text-slate-400' : 'text-slate-600',
        border: theme === 'dark' ? 'border-slate-700/50' : 'border-slate-200/50'
    },

    viewToggle: {
        container: theme === 'dark' ? 'border-slate-600/50' : 'border-slate-200/50 bg-slate-50/50',
        active: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg',
        inactive: theme === 'dark'
            ? 'text-slate-400 hover:text-white hover:bg-slate-600/50'
            : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
    }
}), [theme]);

// Components
const FilterButton: React.FC<FilterButtonProps> = ({
                                                       isActive,
                                                       onClick,
                                                       children,
                                                       variant,
                                                       theme,
                                                       count
                                                   }) => {
    const styles = isActive
        ? FILTER_VARIANTS[variant].active
        : FILTER_VARIANTS[variant].inactive[theme];

    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium btn-hover transition-all duration-300 ${styles}`}
        >
            {children}
            <span className="text-sm">({count})</span>
        </button>
    );
};

const TagComponent: React.FC<TagProps> = ({ label, color, isActive = false, onClick }) => {
    const { theme } = useTheme();

    const colorClasses = useMemo(() => {
        const baseColors = {
            blue: theme === 'dark'
                ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                : 'bg-blue-100 text-blue-700 border-blue-200',
            emerald: theme === 'dark'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                : 'bg-emerald-100 text-emerald-700 border-emerald-200',
            purple: theme === 'dark'
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                : 'bg-purple-100 text-purple-700 border-purple-200',
            amber: theme === 'dark'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                : 'bg-amber-100 text-amber-700 border-amber-200',
        };

        return baseColors[color as keyof typeof baseColors] || baseColors.blue;
    }, [color, theme]);

    return (
        <span
            onClick={onClick}
            className={`px-3 py-1.5 rounded-full text-xs border cursor-pointer transition-all duration-200 hover:scale-105 ${colorClasses}`}
        >
            #{label}
        </span>
    );
};

const FilterBar: React.FC = () => {
    const { theme } = useTheme();
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

    const {
        filterState,
        setStatusFilter,
        setPriorityFilter,
        setCategoryFilter,
        setDateRangeFilter,
        clearFilters,
        getTodoStats,
    } = useTodoStore();

    const stats = getTodoStats();
    const styles = useFilterStyles(theme);

    const handleStatusFilter = useCallback((status: FilterState['status']) => {
        setStatusFilter(status);
    }, [setStatusFilter]);

    const handlePriorityChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setPriorityFilter(e.target.value as FilterState['priority']);
    }, [setPriorityFilter]);

    const handleCategoryChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategoryFilter(e.target.value as CategoryType | 'all');
    }, [setCategoryFilter]);

    const handleDateChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setDateRangeFilter(e.target.value as FilterState['dateRange']);
    }, [setDateRangeFilter]);

    return (
        <div className={`backdrop-blur-sm rounded-2xl p-6 border shadow-lg animate-fadeInUp transition-all duration-300 ${styles.container}`}>

            {/* Main Filter Section */}
            <div className="flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">

                {/* Status Filters */}
                <div className="flex flex-wrap gap-3">
                    <FilterButton
                        isActive={filterState.status === 'all'}
                        onClick={() => handleStatusFilter('all')}
                        variant="all"
                        theme={theme}
                        count={stats.total}
                    >
                        <Grid className="h-4 w-4" />
                        All
                    </FilterButton>

                    <FilterButton
                        isActive={filterState.status === 'active'}
                        onClick={() => handleStatusFilter('active')}
                        variant="active"
                        theme={theme}
                        count={stats.active}
                    >
                        <Clock className="h-4 w-4" />
                        Active
                    </FilterButton>

                    <FilterButton
                        isActive={filterState.status === 'completed'}
                        onClick={() => handleStatusFilter('completed')}
                        variant="completed"
                        theme={theme}
                        count={stats.completed}
                    >
                        <CheckSquare className="h-4 w-4" />
                        Completed
                    </FilterButton>

                    <FilterButton
                        isActive={filterState.status === 'overdue'}
                        onClick={() => handleStatusFilter('overdue')}
                        variant="overdue"
                        theme={theme}
                        count={stats.overdue}
                    >
                        <AlertTriangle className="h-4 w-4" />
                        Overdue
                    </FilterButton>
                </div>

                {/* Filter Controls */}
                <div className="flex flex-wrap gap-4 items-center">

                    {/* Priority Filter */}
                    <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${styles.text.secondary}`}>Priority:</span>
                        <select
                            value={filterState.priority}
                            onChange={handlePriorityChange}
                            className={`rounded-xl px-4 py-2 text-sm border focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 ${styles.select}`}
                        >
                            <option value="all">All</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>

                    {/* Category Filter */}
                    <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${styles.text.secondary}`}>Category:</span>
                        <select
                            value={filterState.category}
                            onChange={handleCategoryChange}
                            className={`rounded-xl px-4 py-2 text-sm border focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 ${styles.select}`}
                        >
                            <option value="all">All</option>
                            <option value="general">💼 General</option>
                            <option value="personal">🏠 Personal</option>
                            <option value="developers">💻 Developers</option>
                            <option value="design">🎨 Design</option>
                            <option value="marketing">📈 Marketing</option>
                        </select>
                    </div>

                    {/* Sort Button */}
                    <button className={`flex items-center gap-2 px-4 py-2 rounded-xl border btn-hover transition-all duration-200 ${styles.select}`}>
                        <SortAsc className="h-4 w-4" />
                        <span className="text-sm font-medium">Sort</span>
                    </button>

                    {/* View Toggle */}
                    <div className={`flex items-center rounded-xl p-1 border ${styles.viewToggle.container}`}>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-lg transition-all duration-200 ${
                                viewMode === 'list' ? styles.viewToggle.active : styles.viewToggle.inactive
                            }`}
                        >
                            <List className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-lg transition-all duration-200 ${
                                viewMode === 'grid' ? styles.viewToggle.active : styles.viewToggle.inactive
                            }`}
                        >
                            <Grid className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Advanced Filters */}
            <div className={`mt-6 pt-6 border-t ${styles.text.border}`}>
                <div className="flex flex-wrap gap-4 items-center">

                    {/* Date Range */}
                    <div className="flex items-center gap-2">
                        <Calendar className={`h-4 w-4 ${styles.text.secondary}`} />
                        <span className={`text-sm font-medium ${styles.text.secondary}`}>Due Date:</span>
                        <select
                            value={filterState.dateRange}
                            onChange={handleDateChange}
                            className={`rounded-lg px-3 py-2 text-sm border focus:border-blue-500 transition-all duration-200 ${styles.dateSelect}`}
                        >
                            <option value="all">All</option>
                            <option value="today">Today</option>
                            <option value="tomorrow">Tomorrow</option>
                            <option value="this-week">This week</option>
                            <option value="next-week">Next week</option>
                            <option value="overdue">Overdue</option>
                        </select>
                    </div>

                    {/* Tags */}
                    <div className="flex items-center gap-3">
                        <span className={`text-sm font-medium ${styles.text.secondary}`}>Tags:</span>
                        <div className="flex flex-wrap gap-2">
                            {TAG_COLORS.map((tag, index) => (
                                <TagComponent
                                    key={index}
                                    label={tag.name}
                                    color={tag.color}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Clear Filters */}
                    <button
                        onClick={clearFilters}
                        className={`ml-auto text-sm font-medium underline transition-colors duration-200 ${
                            theme === 'dark'
                                ? 'text-slate-400 hover:text-white'
                                : 'text-slate-600 hover:text-blue-600'
                        }`}
                    >
                        Clear filters
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className={`mt-6 pt-6 border-t ${styles.text.border}`}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                        <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            {stats.total}
                        </div>
                        <div className={`text-sm font-medium ${styles.text.secondary}`}>Total</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                            {stats.active}
                        </div>
                        <div className={`text-sm font-medium ${styles.text.secondary}`}>Active</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-green-500 bg-clip-text text-transparent">
                            {stats.completed}
                        </div>
                        <div className={`text-sm font-medium ${styles.text.secondary}`}>Completed</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold bg-gradient-to-r from-red-500 to-rose-500 bg-clip-text text-transparent">
                            {stats.overdue}
                        </div>
                        <div className={`text-sm font-medium ${styles.text.secondary}`}>Overdue</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;