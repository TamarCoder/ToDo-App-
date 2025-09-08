"use client"
import React, {useState} from 'react';
import {Plus, Calendar, Flag, Tag, X} from 'lucide-react';
import {useTheme} from "../context/context";
import {CreateTodoInput, useTodoStore} from "../../ZustandStore/TodoContext";

const TodoForm: React.FC = () => {

    const {theme} = useTheme();
    const {addTodo} = useTodoStore();

    const [formData, setFormData] = useState<CreateTodoInput>({
        title: '',
        description: '',
        priority: 'medium',
        category: 'general',
        dueDate: '',
        tags: [] // დაბრუნებული
    })

    const [curentTag, setCurentTag] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Input change handler
    const hanldeInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    // Tag management
    const addTag = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && curentTag.trim()) {
            e.preventDefault();
            if (!formData.tags?.includes(curentTag.trim())) {
                setFormData(prev => ({
                    ...prev,
                    tags: [...(prev.tags || []), curentTag.trim()]
                }))
            }
            setCurentTag('')
        }
    };

    const removeTag = (tagToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title.trim()) return;

        setIsSubmitting(true);

        try {
            addTodo({
                ...formData,
                title: formData.title.trim(),
                description: formData.description?.trim()
            });

            // Reset form
            setFormData({
                title: '',
                description: '',
                priority: 'medium',
                category: 'general',
                dueDate: '',
                tags: [] // დაბრუნებული
            });

        } catch (error) {
            console.error('Error adding todo:', error);
        } finally {
            setIsSubmitting(false);
        }

        console.log(formData)
    };

    return (
        <div
            className={`backdrop-blur-sm rounded-2xl p-6 border shadow-xl animate-fadeInUp ${
                theme === 'dark'
                    ? 'bg-gray-800/60 border-gray-700/50'
                    : 'bg-white border-gray-200/50'
            }`}>

            <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-bold flex items-center gap-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                    <Plus className="h-5 w-5 text-blue-400"/>
                    New Tasks
                </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Title Input */}
                <div className="space-y-2">
                    <label className={`block text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>Title *</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={hanldeInputChange}
                        placeholder="Enter task title..."
                        className={`w-full border rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 ${
                            theme === 'dark'
                                ? 'bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-400'
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                    />
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <label className={`block text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>Description</label>
                    <textarea
                        rows={3}
                        name="description"
                        value={formData.description}
                        onChange={hanldeInputChange}
                        placeholder="Detailed description (optional)..."
                        className={`w-full border rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 resize-none ${
                            theme === 'dark'
                                ? 'bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-400'
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                    />
                </div>

                {/* Form Row - Priority & Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Priority */}
                    <div className="space-y-2">
                        <label className={`flex text-sm font-medium items-center gap-2 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                            <Flag className="h-4 w-4"/>
                            Priority
                        </label>
                        <select
                            name='priority'
                            value={formData.priority}
                            onChange={hanldeInputChange}
                            className={`w-full border rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 ${
                                theme === 'dark'
                                    ? 'bg-gray-700/50 border-gray-600/50 text-white'
                                    : 'bg-white border-gray-300 text-gray-900'
                            }`}
                        >
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="low">Low</option>
                        </select>
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                        <label className={`flex text-sm font-medium items-center gap-2 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                            <Tag className="h-4 w-4"/>
                            Category
                        </label>
                        <select
                            name='category'
                            value={formData.category}
                            onChange={hanldeInputChange}
                            className={`w-full border rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 ${
                                theme === 'dark'
                                    ? 'bg-gray-700/50 border-gray-600/50 text-white'
                                    : 'bg-white border-gray-300 text-gray-900'
                            }`}>
                            <option value="general">General</option>
                            <option value="personal">Personal</option>
                            <option value="developers">Developers</option>
                            <option value="design">Design</option>
                            <option value="marketing">Marketing</option>
                        </select>
                    </div>
                </div>

                {/* Due Date */}
                <div className="space-y-2">
                    <label className={`flex text-sm font-medium items-center gap-2 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                        <Calendar className="h-4 w-4"/>
                        Completion date
                    </label>
                    <input
                        type="date"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={hanldeInputChange}
                        className={`w-full border rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 ${
                            theme === 'dark'
                                ? 'bg-gray-700/50 border-gray-600/50 text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                        }`}
                    />
                </div>

                {/* Tags */}
                <div className="space-y-2">
                    <label className={`flex text-sm font-medium items-center gap-2 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                        <Tag className="h-4 w-4"/>
                        Tags
                    </label>

                    {/* Dynamic Tags Display */}
                    {formData.tags && formData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-2">
                            {formData.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm border ${
                                        theme === 'dark'
                                            ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                                            : 'bg-blue-100 text-blue-700 border-blue-300'
                                    }`}
                                >
                                    #{tag}
                                    <X
                                        className="h-3 w-3 cursor-pointer hover:opacity-75"
                                        onClick={() => removeTag(tag)}
                                    />
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Tag Input */}
                    <input
                        type="text"
                        value={curentTag}
                        onChange={(e) => setCurentTag(e.target.value)}
                        onKeyDown={addTag}
                        placeholder="Add tag and press Enter..."
                        className={`w-full border rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 ${
                            theme === 'dark'
                                ? 'bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-400'
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                    />
                </div>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting || !formData.title.trim()}
                        className={`flex-1 font-medium py-3 px-6 rounded-xl hover:shadow-lg btn-hover flex items-center justify-center gap-2 transition-all duration-200 ${
                            isSubmitting || !formData.title.trim()
                                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                    >
                        <Plus className="h-4 w-4"/>
                        {isSubmitting ? 'Adding...' : 'Add New Task'}
                    </button>
                    <button
                        type="button"
                        onClick={() => setFormData({
                            title: '',
                            description: '',
                            priority: 'medium',
                            category: 'general',
                            dueDate: '',
                            tags: []
                        })}
                        className={`sm:w-auto font-medium py-3 px-6 rounded-xl border transition-all duration-200 ${
                            theme === 'dark'
                                ? 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                        Cancel
                    </button>
                </div>

            </form>

        </div>
    )
}

export default TodoForm;