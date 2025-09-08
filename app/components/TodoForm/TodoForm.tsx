"use client"
import React, { useState, useCallback, useMemo } from 'react';
import { Plus, Calendar, Flag, Tag, X, AlertCircle, CheckCircle } from 'lucide-react';
import { useTheme } from "../context/context";
import { CreateTodoInput, useTodoStore } from "../../ZustandStore/TodoContext";

// Types
interface FormFieldProps {
    label: string;
    required?: boolean;
    icon?: React.ComponentType<{ className?: string }>;
    children: React.ReactNode;
}

interface TagComponentProps {
    tag: string;
    onRemove: (tag: string) => void;
    theme: 'light' | 'dark';
}

// Constants
const PRIORITIES = [
    { value: 'low', label: 'Low', color: 'text-blue-600' },
    { value: 'medium', label: 'Medium', color: 'text-amber-600' },
    { value: 'high', label: 'High', color: 'text-red-600' }
] as const;

const CATEGORIES = [
    { value: 'general', label: 'General', emoji: '💼' },
    { value: 'personal', label: 'Personal', emoji: '🏠' },
    { value: 'developers', label: 'Developers', emoji: '💻' },
    { value: 'design', label: 'Design', emoji: '🎨' },
    { value: 'marketing', label: 'Marketing', emoji: '📈' }
] as const;

const INITIAL_FORM_DATA: CreateTodoInput = {
    title: '',
    description: '',
    priority: 'medium',
    category: 'general',
    dueDate: '',
    tags: []
};

// Custom Hooks
const useFormStyles = (theme: 'light' | 'dark') => {
    return useMemo(() => ({
        container: theme === 'dark'
            ? 'bg-slate-800/60 border-slate-700/50'
            : 'bg-gradient-to-br from-blue-50/50 to-indigo-50/50 border-slate-200/50 shadow-lg',

        input: theme === 'dark'
            ? 'bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400'
            : 'bg-white/80 border-slate-200 text-slate-900 placeholder-slate-500 focus:bg-white',

        select: theme === 'dark'
            ? 'bg-slate-700/50 border-slate-600/50 text-white'
            : 'bg-white/80 border-slate-200 text-slate-900 focus:bg-white',

        label: theme === 'dark' ? 'text-slate-300' : 'text-slate-700',

        text: {
            primary: theme === 'dark' ? 'text-white' : 'text-slate-900',
            secondary: theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
        }
    }), [theme]);
};

const useFormValidation = (formData: CreateTodoInput) => {
    return useMemo(() => {
        const errors: Record<string, string> = {};

        if (!formData.title.trim()) {
            errors.title = 'Title is required';
        } else if (formData.title.trim().length < 3) {
            errors.title = 'Title must be at least 3 characters';
        }

        if (formData.description && formData.description.length > 500) {
            errors.description = 'Description must be less than 500 characters';
        }

        return {
            errors,
            isValid: Object.keys(errors).length === 0 && formData.title.trim().length > 0
        };
    }, [formData]);
};

// Components
const FormField: React.FC<FormFieldProps> = ({ label, required, icon: Icon, children }) => {
    const { theme } = useTheme();
    const styles = useFormStyles(theme);

    return (
        <div className="space-y-2">
            <label className={`flex text-sm font-semibold items-center gap-2 ${styles.label}`}>
                {Icon && <Icon className="h-4 w-4" />}
                {label}
                {required && <span className="text-red-500">*</span>}
            </label>
            {children}
        </div>
    );
};

const TagComponent: React.FC<TagComponentProps> = ({ tag, onRemove, theme }) => {
    const tagColors = [
        'from-blue-500 to-indigo-500',
        'from-emerald-500 to-green-500',
        'from-purple-500 to-violet-500',
        'from-amber-500 to-orange-500',
        'from-pink-500 to-rose-500'
    ];

    const colorIndex = tag.length % tagColors.length;

    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 hover:scale-105 ${
            theme === 'dark'
                ? 'bg-slate-700/50 text-slate-300 border-slate-600/50'
                : `bg-gradient-to-r ${tagColors[colorIndex]} text-white border-transparent shadow-sm`
        }`}>
            #{tag}
            <X
                className="h-3 w-3 cursor-pointer hover:opacity-75 transition-opacity"
                onClick={() => onRemove(tag)}
            />
        </span>
    );
};

const TodoForm: React.FC = () => {
    const { theme } = useTheme();
    const { addTodo } = useTodoStore();

    const [formData, setFormData] = useState<CreateTodoInput>(INITIAL_FORM_DATA);
    const [currentTag, setCurrentTag] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const styles = useFormStyles(theme);
    const { errors, isValid } = useFormValidation(formData);

    // Event Handlers
    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleTagAdd = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && currentTag.trim()) {
            e.preventDefault();
            const newTag = currentTag.trim().toLowerCase();

            if (!formData.tags?.includes(newTag) && formData.tags!.length < 5) {
                setFormData(prev => ({
                    ...prev,
                    tags: [...(prev.tags || []), newTag]
                }));
                setCurrentTag('');
            }
        }
    }, [currentTag, formData.tags]);

    const handleTagRemove = useCallback((tagToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
        }));
    }, []);

    const handleReset = useCallback(() => {
        setFormData(INITIAL_FORM_DATA);
        setCurrentTag('');
        setShowSuccess(false);
    }, []);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isValid) return;

        setIsSubmitting(true);

        try {
            await addTodo({
                ...formData,
                title: formData.title.trim(),
                description: formData.description?.trim()
            });

            setShowSuccess(true);
            handleReset();

            setTimeout(() => setShowSuccess(false), 3000);
        } catch (error) {
            console.error('Error adding todo:', error);
        } finally {
            setIsSubmitting(false);
        }
    }, [formData, isValid, addTodo, handleReset]);

    const getTodayDate = () => {
        return new Date().toISOString().split('T')[0];
    };

    return (
        <div className={`backdrop-blur-sm rounded-2xl p-6 border shadow-xl animate-fadeInUp transition-all duration-300 ${styles.container}`}>

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-bold flex items-center gap-2 ${styles.text.primary}`}>
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                        <Plus className="h-5 w-5 text-white" />
                    </div>
                    Create New Task
                </h2>

                {showSuccess && (
                    <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">Task created!</span>
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Title */}
                <FormField label="Task Title" required icon={Tag}>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="What needs to be done?"
                        className={`w-full border rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 ${styles.input}`}
                    />
                    {errors.title && (
                        <div className="flex items-center gap-1 text-red-500 text-sm">
                            <AlertCircle className="h-3 w-3" />
                            {errors.title}
                        </div>
                    )}
                </FormField>

                {/* Description */}
                <FormField label="Description">
                    <textarea
                        rows={3}
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Add more details about this task..."
                        className={`w-full border rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 resize-none ${styles.input}`}
                    />
                    <div className={`text-xs ${styles.text.secondary} text-right`}>
                        {formData.description?.length || 0}/500
                    </div>
                </FormField>

                {/* Priority & Category Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Priority */}
                    <FormField label="Priority" icon={Flag}>
                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleInputChange}
                            className={`w-full border rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 ${styles.select}`}
                        >
                            {PRIORITIES.map(priority => (
                                <option key={priority.value} value={priority.value}>
                                    {priority.label}
                                </option>
                            ))}
                        </select>
                    </FormField>

                    {/* Category */}
                    <FormField label="Category" icon={Tag}>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className={`w-full border rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 ${styles.select}`}
                        >
                            {CATEGORIES.map(category => (
                                <option key={category.value} value={category.value}>
                                    {category.emoji} {category.label}
                                </option>
                            ))}
                        </select>
                    </FormField>
                </div>

                {/* Due Date */}
                <FormField label="Due Date" icon={Calendar}>
                    <input
                        type="date"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleInputChange}
                        min={getTodayDate()}
                        className={`w-full border rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 ${styles.input}`}
                    />
                </FormField>

                {/* Tags */}
                <FormField label="Tags" icon={Tag}>
                    {/* Tag Display */}
                    {formData.tags && formData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                            {formData.tags.map((tag, index) => (
                                <TagComponent
                                    key={index}
                                    tag={tag}
                                    onRemove={handleTagRemove}
                                    theme={theme}
                                />
                            ))}
                        </div>
                    )}

                    {/* Tag Input */}
                    <input
                        type="text"
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        onKeyDown={handleTagAdd}
                        placeholder="Add tag and press Enter... (max 5)"
                        disabled={formData.tags!.length >= 5}
                        className={`w-full border rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 ${styles.input} ${
                            formData.tags!.length >= 5 ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    />
                    <div className={`text-xs ${styles.text.secondary}`}>
                        {formData.tags!.length}/5 tags
                    </div>
                </FormField>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-200/50">
                    <button
                        type="submit"
                        disabled={isSubmitting || !isValid}
                        className={`flex-1 font-semibold py-3 px-6 rounded-xl shadow-lg btn-hover flex items-center justify-center gap-2 transition-all duration-200 ${
                            isSubmitting || !isValid
                                ? 'bg-slate-400 text-slate-200 cursor-not-allowed'
                                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white hover:shadow-xl'
                        }`}
                    >
                        {isSubmitting ? (
                            <>
                                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                                Creating...
                            </>
                        ) : (
                            <>
                                <Plus className="h-4 w-4" />
                                Create Task
                            </>
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={handleReset}
                        className={`sm:w-auto font-medium py-3 px-6 rounded-xl border transition-all duration-200 ${
                            theme === 'dark'
                                ? 'bg-slate-700 text-slate-300 border-slate-600 hover:bg-slate-600'
                                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50 shadow-sm'
                        }`}
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TodoForm;