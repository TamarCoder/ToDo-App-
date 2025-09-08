"use client"
import React, { useState } from 'react';
import { X, Trash2, AlertTriangle } from 'lucide-react';
import { useTodoStore } from '../../ZustandStore/TodoContext';
import { useTheme } from '../context/context';

interface DeleteModalProps {
    todoId: string | null;
    onClose: () => void;
    onConfirm: (todoId: string) => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ todoId, onClose, onConfirm }) => {
    const { deleteTodo, todos, toggleTodo } = useTodoStore();
    const { theme } = useTheme();

    // Get todo data
    const todo = todos.find(t => t.id === todoId);

    // Checkbox states
    const [deleteSubtasks, setDeleteSubtasks] = useState(false);
    const [keepBackup, setKeepBackup] = useState(true);

    const handleDelete = () => {
        if (todoId) {
            deleteTodo(todoId);
            onConfirm(todoId);
        }
    };

    const handleMarkCompleted = () => {
        if (todoId) {
            toggleTodo(todoId);
            onClose();
        }
    };

    if (!todo) return null;

    // Helper functions
    const getPriorityText = (priority: string) => {
        switch (priority) {
            case 'high': return 'High priority';
            case 'medium': return 'Medium priority';
            case 'low': return 'Low priority';
            default: return 'Medium priority';
        }
    };

    const getCategoryText = (category: string) => {
        switch (category) {
            case 'general': return '💼 General';
            case 'personal': return '🏠 Personal';
            case 'developers': return '🛒 Developers';
            case 'design': return '🏥 Design';
            case 'marketing': return '📚 Marketing';
            default: return '💼 General';
        }
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'No due date';
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">

                {/* Modal */}
                <div className={`rounded-2xl shadow-2xl border max-w-md w-full animate-bounceIn ${
                    theme === 'dark'
                        ? 'bg-gray-800 border-gray-700/50'
                        : 'bg-white border-gray-200'
                }`}>

                    {/* Header */}
                    <div className={`flex items-center justify-between p-6 border-b ${
                        theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200'
                    }`}>
                        <div className="flex items-center gap-3">
                            <div className="bg-red-500/20 p-2 rounded-xl">
                                <AlertTriangle className="h-6 w-6 text-red-400" />
                            </div>
                            <h2 className={`text-xl font-bold ${
                                theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>Delete Task</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className={`p-2 rounded-lg btn-hover ${
                                theme === 'dark'
                                    ? 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                            }`}>
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <div className="space-y-4">

                            {/* Warning Message */}
                            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                                <p className="text-red-300 text-sm">
                                    Are you sure you want to delete this task? This action is irreversible.
                                </p>
                            </div>

                            {/* Todo Preview */}
                            <div className={`rounded-xl p-4 border ${
                                theme === 'dark'
                                    ? 'bg-gray-700/50 border-gray-600/50'
                                    : 'bg-gray-50 border-gray-200'
                            }`}>
                                <h3 className={`font-medium mb-2 ${
                                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                                }`}>Task to be deleted:</h3>
                                <div className="space-y-2">
                                    <p className={`font-medium ${
                                        theme === 'dark' ? 'text-gray-300' : 'text-gray-800'
                                    }`}>{todo.title}</p>
                                    {todo.description && (
                                        <p className={`text-sm ${
                                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                        }`}>{todo.description}</p>
                                    )}
                                    <div className="flex items-center gap-4 text-xs">
                                        <span className="bg-red-500/20 text-red-300 px-2 py-1 rounded-full border border-red-500/30">
                                            {getPriorityText(todo.priority)}
                                        </span>
                                        <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                                            📅 {formatDate(todo.dueDate)}
                                        </span>
                                        <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                                            {getCategoryText(todo.category)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Options */}
                            <div className="space-y-3">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={deleteSubtasks}
                                        onChange={(e) => setDeleteSubtasks(e.target.checked)}
                                        className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                                    />
                                    <span className={`text-sm ${
                                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                                    }`}>
                                        Also delete all related subtasks.
                                    </span>
                                </label>

                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={keepBackup}
                                        onChange={(e) => setKeepBackup(e.target.checked)}
                                        className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                                    />
                                    <span className={`text-sm ${
                                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                                    }`}>
                                        Keep backups until deleted (30 days)
                                    </span>
                                </label>
                            </div>

                            {/* Statistics */}
                            <div className={`rounded-lg p-3 text-center ${
                                theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-100'
                            }`}>
                                <p className={`text-xs ${
                                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                }`}>
                                    This will be yours <span className={`font-medium ${
                                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                                }`}>5th</span> deleted task this month
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 p-6 pt-0">
                        <button
                            onClick={onClose}
                            className="flex-1 bg-gray-700/50 text-gray-300 font-medium py-3 px-6 rounded-xl hover:bg-gray-600/50 btn-hover border border-gray-600/50">
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            className="flex-1 bg-gradient-danger text-white font-medium py-3 px-6 rounded-xl hover:shadow-lg btn-hover flex items-center justify-center gap-2">
                            <Trash2 className="h-4 w-4" />
                            Remove
                        </button>
                    </div>

                    {/* Alternative Actions */}
                    <div className="px-6 pb-6">
                        <div className={`border-t pt-4 ${
                            theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200'
                        }`}>
                            <p className={`text-center text-sm mb-3 ${
                                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                                Or try these alternatives:
                            </p>
                            <div className="flex flex-wrap gap-2 justify-center">
                                <button
                                    onClick={handleMarkCompleted}
                                    className="text-xs bg-blue-500/20 text-blue-300 px-3 py-1.5 rounded-lg hover:bg-blue-500/30 btn-hover border border-blue-500/30">
                                    Mark as completed
                                </button>
                                <button
                                    onClick={onClose}
                                    className="text-xs bg-yellow-500/20 text-yellow-300 px-3 py-1.5 rounded-lg hover:bg-yellow-500/30 btn-hover border border-yellow-500/30">
                                    Move to archive
                                </button>
                                <button
                                    onClick={onClose}
                                    className="text-xs bg-purple-500/20 text-purple-300 px-3 py-1.5 rounded-lg hover:bg-purple-500/30 btn-hover border border-purple-500/30">
                                    Later execution
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DeleteModal;