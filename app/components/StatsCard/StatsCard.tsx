"use client"
import React, { useMemo, useCallback } from 'react';
import { TrendingUp, TrendingDown, CheckCircle, Clock, AlertTriangle, Target } from 'lucide-react';
import { useTheme } from "../context/context";
import { useTodoStore } from '../../ZustandStore/TodoContext';

// Types
interface StatCardProps {
    title: string;
    value: number;
    icon: React.ComponentType<{ className?: string }>;
    trend: {
        value: number;
        isPositive: boolean;
        suffix?: string;
    };
    color: 'blue' | 'green' | 'yellow' | 'red';
    progress: number;
    delay: string;
    onClick?: () => void;
}

// Constants
const STAT_THEMES = {
    blue: {
        gradient: 'from-blue-500 to-indigo-600',
        lightBg: 'from-blue-50 to-indigo-50',
        darkBg: 'bg-blue-600/20 border-blue-500/30',
        lightIcon: 'bg-blue-100 border-blue-200 text-blue-600',
        darkIcon: 'bg-blue-600/20 border-blue-500/30 text-blue-400',
        progress: 'bg-gradient-to-r from-blue-500 to-indigo-600',
        hover: 'hover:border-blue-400',
        trend: 'text-blue-600'
    },
    green: {
        gradient: 'from-emerald-500 to-green-600',
        lightBg: 'from-emerald-50 to-green-50',
        darkBg: 'bg-emerald-600/20 border-emerald-500/30',
        lightIcon: 'bg-emerald-100 border-emerald-200 text-emerald-600',
        darkIcon: 'bg-emerald-600 border-emerald-500/30 text-emerald-100',
        progress: 'bg-gradient-to-r from-emerald-500 to-green-600',
        hover: 'hover:border-emerald-400',
        trend: 'text-emerald-600'
    },
    yellow: {
        gradient: 'from-amber-500 to-orange-600',
        lightBg: 'from-amber-50 to-orange-50',
        darkBg: 'bg-amber-600/20 border-amber-500/30',
        lightIcon: 'bg-amber-100 border-amber-200 text-amber-600',
        darkIcon: 'bg-amber-600 border-amber-500/30 text-amber-100',
        progress: 'bg-gradient-to-r from-amber-500 to-orange-600',
        hover: 'hover:border-amber-400',
        trend: 'text-amber-600'
    },
    red: {
        gradient: 'from-red-500 to-rose-600',
        lightBg: 'from-red-50 to-rose-50',
        darkBg: 'bg-red-600/20 border-red-500/30',
        lightIcon: 'bg-red-100 border-red-200 text-red-600',
        darkIcon: 'bg-red-600 border-red-500/30 text-red-100',
        progress: 'bg-gradient-to-r from-red-500 to-rose-600',
        hover: 'hover:border-red-400',
        trend: 'text-red-600'
    }
} as const;

// Hooks
const useStatCardStyles = (theme: 'light' | 'dark', color: keyof typeof STAT_THEMES) => {
    return useMemo(() => {
        const colorTheme = STAT_THEMES[color];

        return {
            container: theme === 'dark'
                ? 'bg-slate-800/60 border-slate-700/50'
                : `bg-gradient-to-br ${colorTheme.lightBg} border-slate-200/50 shadow-lg`,

            icon: theme === 'dark' ? colorTheme.darkIcon : colorTheme.lightIcon,

            text: {
                primary: theme === 'dark' ? 'text-white' : 'text-slate-900',
                secondary: theme === 'dark' ? 'text-slate-400' : 'text-slate-600',
                trend: theme === 'dark' ? colorTheme.trend.replace('600', '400') : colorTheme.trend
            },

            progress: {
                track: theme === 'dark' ? 'bg-slate-700' : 'bg-white/60',
                bar: colorTheme.progress
            },

            hover: colorTheme.hover
        };
    }, [theme, color]);
};

const useProgressCalculation = () => {
    return useCallback((current: number, total: number, min: number = 10): number => {
        if (total === 0) return 0;
        const percentage = Math.round((current / total) * 100);
        return current > 0 ? Math.max(percentage, min) : 0;
    }, []);
};

// Components
const StatCard: React.FC<StatCardProps> = ({
                                               title,
                                               value,
                                               icon: Icon,
                                               trend,
                                               color,
                                               progress,
                                               delay,
                                               onClick
                                           }) => {
    const { theme } = useTheme();
    const styles = useStatCardStyles(theme, color);

    const TrendIcon = trend.isPositive ? TrendingUp : TrendingDown;

    return (
        <div
            className={`rounded-2xl p-6 cursor-pointer backdrop-blur-sm border transition-all duration-300 ${styles.container} ${styles.hover} animate-fadeInUp hover:scale-105 hover:shadow-xl`}
            style={{ animationDelay: delay }}
            onClick={onClick}
        >
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl border ${styles.icon}`}>
                    <Icon className="h-6 w-6" />
                </div>
                <div className={`flex items-center text-sm font-medium ${styles.text.trend}`}>
                    <TrendIcon className="h-4 w-4 mr-1" />
                    {trend.value}{trend.suffix || '%'}
                </div>
            </div>

            <h3 className={`text-3xl font-bold mb-1 ${styles.text.primary}`}>
                {value.toLocaleString()}
            </h3>

            <p className={`text-sm font-medium ${styles.text.secondary}`}>
                {title}
            </p>

            <div className={`mt-4 rounded-full h-2.5 ${styles.progress.track}`}>
                <div
                    className={`rounded-full h-2.5 transition-all duration-700 ease-out ${styles.progress.bar}`}
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className={`mt-2 text-xs font-medium ${styles.text.secondary}`}>
                {progress}% of total
            </div>
        </div>
    );
};

const StatsCard: React.FC = () => {
    const { getTodoStats } = useTodoStore();
    const calculateProgress = useProgressCalculation();

    const stats = getTodoStats();

    const statCards = useMemo(() => [
        {
            title: "Total Tasks",
            value: stats.total,
            icon: CheckCircle,
            trend: {
                value: Math.round(stats.completionRate),
                isPositive: stats.completionRate > 50,
                suffix: '%'
            },
            color: 'blue' as const,
            progress: Math.min(stats.total * 8, 100),
            delay: '0ms'
        },
        {
            title: "Completed",
            value: stats.completed,
            icon: Target,
            trend: {
                value: calculateProgress(stats.completed, stats.total),
                isPositive: stats.completed > 0,
                suffix: '%'
            },
            color: 'green' as const,
            progress: stats.completionRate,
            delay: '100ms'
        },
        {
            title: "In Progress",
            value: stats.active,
            icon: Clock,
            trend: {
                value: calculateProgress(stats.active, stats.total),
                isPositive: stats.active < stats.total * 0.7,
                suffix: '%'
            },
            color: 'yellow' as const,
            progress: calculateProgress(stats.active, stats.total),
            delay: '200ms'
        },
        {
            title: "Overdue",
            value: stats.overdue,
            icon: AlertTriangle,
            trend: {
                value: stats.overdue,
                isPositive: false,
                suffix: ''
            },
            color: 'red' as const,
            progress: stats.overdue > 0 ? Math.max(calculateProgress(stats.overdue, stats.total), 15) : 0,
            delay: '300ms'
        }
    ], [stats, calculateProgress]);

    const handleCardClick = useCallback((cardType: string) => {
        // Handle card click actions (e.g., filter by status)
        console.log(`Clicked on ${cardType} card`);
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((card, index) => (
                <StatCard
                    key={card.title}
                    {...card}
                    onClick={() => handleCardClick(card.title)}
                />
            ))}
        </div>
    );
};

export default StatsCard;