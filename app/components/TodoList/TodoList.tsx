"use client"
import React, { useState } from 'react';
import {CheckCircle2, Clock, AlertCircle, MoreVertical, Calendar, Tag, Edit, Trash2} from 'lucide-react';
import {useTheme} from "../context/context";
import {useTodoStore} from "../../ZustandStore/TodoContext";
import DeleteModal from "../DeleteModal/DeleteModal";

const TodoList: React.FC = () => {

    const {theme} = useTheme();
    const {
        getFilteredTodos,
        toggleTodo,
        deleteTodo,
        getTodoStats
    } = useTodoStore();

    // Delete Modal State
    const [deleteModal, setDeleteModal] = useState<{isOpen: boolean, todoId: string | null}>({
        isOpen: false,
        todoId: null
    });

    const todos = getFilteredTodos();
    const stats = getTodoStats();

    const getPriorityTextColor = (priority: string) => {
        switch (priority) {
            case 'high':
                return 'border-l-red-500';
            case 'medium':
                return 'border-l-yellow-500';
            case 'low':
                return 'border-l-blue-500';
            default:
                return 'border-l-gray-500';
        }
    };

    const getPriorityIcon = (priority: string) => {
        switch (priority) {
            case 'high':
                return <AlertCircle className="h-4 w-4"/>;
            case 'medium':
                return <Clock className="h-4 w-4"/>;
            case 'low':
                return <Clock className="h-4 w-4"/>;
            default:
                return <Clock className="h-4 w-4"/>;
        }
    };

    const getPriorityText = (priority: string) => {
        switch (priority) {
            case 'high':
                return 'High';
            case 'medium':
                return 'Medium';
            case 'low':
                return 'Low';
            default:
                return 'Medium';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high':
                return 'text-red-400';
            case 'medium':
                return 'text-yellow-400';
            case 'low':
                return 'text-blue-400';
            default:
                return 'text-gray-400';
        }
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'general': return '💼';
            case 'personal': return '🏠';
            case 'developers': return '🛒';
            case 'design': return '🏥';
            case 'marketing': return '📚';
            default: return '💼';
        }
    };

    return (
        <div className="space-y-4">
            {/* List Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>My Task</h2>
                <div className={`flex items-center gap-2 text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                    <span>{stats.active} Action</span>
                    <span>•</span>
                    <span>{stats.completed} finished</span>
                </div>
            </div>

            {/* Todo Items */}
            <div className="space-y-3">
                {todos.map((todo) => (
                    <div
                        key={todo.id}
                        className={`backdrop-blur-sm rounded-xl p-4 border-l-4 ${getPriorityTextColor(todo.priority)} border card-hover animate-fadeInUp transition-all duration-300 ${
                            theme === 'dark'
                                ? 'bg-gray-800/60 border-gray-700/50'
                                : 'bg-white border-gray-200/50 shadow-sm'
                        }`}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3 flex-1">
                                <button
                                    className={`mt-1 p-1 rounded-full transition-colors ${
                                        theme === 'dark'
                                            ? 'hover:bg-gray-700/50'
                                            : 'hover:bg-gray-100'
                                    }`}
                                    onClick={() => toggleTodo(todo.id)}
                                >
                                    {todo.completed ? (
                                        <CheckCircle2 className="w-5 h-5 text-green-400"/>
                                    ) : (
                                        <div className={`w-5 h-5 border-2 rounded-full transition-colors ${
                                            theme === 'dark'
                                                ? 'border-gray-400 hover:border-blue-400'
                                                : 'border-gray-300 hover:border-blue-500'
                                        }`}></div>
                                    )}
                                </button>

                                <div className="flex-1 space-y-2">
                                    <h3 className={`font-medium text-lg transition-colors ${
                                        todo.completed ? 'line-through opacity-75' : ''
                                    } ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                        {todo.title}
                                    </h3>

                                    {todo.description && (
                                        <p className={`text-sm ${
                                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                        }`}>{todo.description}</p>
                                    )}

                                    <div className="flex items-center gap-4 text-sm">
                                        <div className={`flex items-center gap-1 ${getPriorityColor(todo.priority)}`}>
                                            {getPriorityIcon(todo.priority)}
                                            <span>{getPriorityText(todo.priority)}</span>
                                        </div>

                                        {todo.dueDate && (
                                            <div className={`flex items-center gap-1 ${
                                                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                            }`}>
                                                <Calendar className="h-4 w-4"/>
                                                <span>{new Date(todo.dueDate).toLocaleDateString()}</span>
                                            </div>
                                        )}

                                        <div className={`flex items-center gap-1 ${
                                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                        }`}>
                                            <span>{getCategoryIcon(todo.category)}</span>
                                            <span className="capitalize">{todo.category}</span>
                                        </div>
                                    </div>

                                    {todo.tags && todo.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {todo.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className={`px-2 py-1 rounded-full text-xs border ${
                                                        theme === 'dark'
                                                            ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                                                            : 'bg-blue-100 text-blue-700 border-blue-300'
                                                    }`}
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-1">
                                <button
                                    className={`p-2 rounded-lg btn-hover transition-colors ${
                                        theme === 'dark'
                                            ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-700/50'
                                            : 'text-gray-500 hover:text-blue-600 hover:bg-gray-100'
                                    }`}
                                >
                                    <Edit className="h-4 w-4"/>
                                </button>

                                <button
                                    className={`p-2 rounded-lg btn-hover transition-colors ${
                                        theme === 'dark'
                                            ? 'text-gray-400 hover:text-red-400 hover:bg-gray-700/50'
                                            : 'text-gray-500 hover:text-red-600 hover:bg-gray-100'
                                    }`}
                                    onClick={() => setDeleteModal({isOpen: true, todoId: todo.id})}
                                >
                                    <Trash2 className="h-4 w-4"/>
                                </button>

                                <button
                                    className={`p-2 rounded-lg btn-hover transition-colors ${
                                        theme === 'dark'
                                            ? 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                                    }`}
                                >
                                    <MoreVertical className="h-4 w-4"/>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {todos.length === 0 && (
                <div className="text-center py-12">
                    <div className={`rounded-2xl p-8 border ${
                        theme === 'dark'
                            ? 'bg-gray-800/40 border-gray-700/50'
                            : 'bg-gray-50 border-gray-200'
                    }`}>
                        <CheckCircle2 className={`h-16 w-16 mx-auto mb-4 ${
                            theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                        }`}/>
                        <h3 className={`text-xl font-medium mb-2 ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>You have no tasks</h3>
                        <p className={`${
                            theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                        }`}>Add your first task to get started!</p>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {deleteModal.isOpen && (
                <DeleteModal
                    todoId={deleteModal.todoId}
                    onClose={() => setDeleteModal({isOpen: false, todoId: null})}
                    onConfirm={() => setDeleteModal({isOpen: false, todoId: null})}
                />
            )}
        </div>
    );
};

export default TodoList;