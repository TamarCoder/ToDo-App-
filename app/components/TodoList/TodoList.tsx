"use client"
import React from 'react';
import {CheckCircle2, Clock, AlertCircle, MoreVertical, Calendar, Tag, Edit, Trash2} from 'lucide-react';
import {useTheme} from "../context/context";
import {useTodoStore} from "../../ZustandStore/TodoContext";

const TodoList: React.FC = () => {

    const {theme} = useTheme();
    const {
        getFilteredTodos,
        toggleTodo,
        deleteTodo,
        getTodoStats
    } = useTodoStore();
    const todos = getFilteredTodos();
    const stats = getTodoStats();

    const getPriorityTextColor = (priority: string) => {
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


    return (

        <div className={`space-y-4 ${
            theme === 'dark'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-gray-900'

        }`}>
            {/* List Header */}
            <div className={`flex items-center justify-between mb-6 ${
                theme === 'dark'
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-900'
            }`}>
                <h2 className={`text-2xl font-bold text-white
                ${theme === 'dark'
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-900'}
                `}>My Task</h2>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>5 Action</span>
                    <span>•</span>
                    <span>3 finished</span>
                </div>
            </div>

            {/* Todo Items */}
            <div className={`space-y-3 ${theme === 'dark'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-900'}`}>
                {todos.map((todo) => (
                    <div
                        key={todo.id}
                        className={`bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border-l-4 ${getPriorityTextColor(todo.priority)} border border-gray-700/50 card-hover animate-fadeInUp
                         ${theme === 'dark'
                            ? 'bg-slate-900 text-white'
                            : 'bg-white text-slate-900'}
                        `}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3 flex-1">
                                <button
                                    className="mt-1 p-1 rounded-full hover:bg-gray-700/50 transition-colors"
                                    onClick={() => toggleTodo(todo.id)}
                                >
                                    {todo.completed ? (
                                        <CheckCircle2 className="w-5 h-5 text-green-400"/>
                                    ) : (
                                        <div
                                            className="w-5 h-5 border-2 border-gray-400 rounded-full hover:border-blue-400 transition-colors"></div>
                                    )}
                                </button>

                                <div className="flex-1 space-y-2">
                                    <h3 className={`text-white font-medium text-lg ${todo.completed ? 'line-through opacity-75' : ''} 
                                     ${theme === 'dark'
                                        ? 'bg-slate-900 text-white'
                                        : 'bg-white text-slate-900'}
                                     `}>
                                        {todo.title}
                                    </h3>
                                    {todo.description && (
                                        <p className="text-gray-400 text-sm">{todo.description}</p>
                                    )}

                                    <div className="flex items-center gap-4 text-sm">
                                        <div
                                            className={`flex items-center gap-1 ${getPriorityTextColor(todo.priority)}`}>
                                            {getPriorityIcon(todo.priority)}
                                            <span>{getPriorityText(todo.priority)}</span>
                                        </div>

                                        {todo.dueDate && (
                                            <div className="flex items-center gap-1 text-gray-400">
                                                <Calendar className="h-4 w-4"/>
                                                <span>{new Date(todo.dueDate).toLocaleDateString()}</span>
                                            </div>
                                        )}

                                        <div className="flex items-center gap-1 text-gray-400">
                                            {/*<span>{getCategoryIcon(todo.category)}</span>*/}
                                            <span>{todo.category}</span>
                                        </div>
                                    </div>

                                    {todo.tags && todo.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {todo.tags.map((tag, index) => (
                                                <span key={index}
                                                      className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full text-xs border border-blue-500/30">
                  #{tag}
                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-1">
                                <button
                                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700/50 rounded-lg btn-hover"
                                    onClick={() => deleteTodo(todo.id)}
                                >
                                    <Trash2 className="h-4 w-4"/>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}


            </div>

            {/* Empty State (hidden when todos exist) */}
            <div className="hidden text-center py-12">
                <div className="bg-gray-800/40 rounded-2xl p-8 border border-gray-700/50">
                    <CheckCircle2 className="h-16 w-16 text-gray-500 mx-auto mb-4"/>
                    <h3 className="text-xl font-medium text-gray-400 mb-2">you have no task</h3>
                    <p className="text-gray-500">add your new task to start work!</p>
                </div>
            </div>
        </div>
    );
};

export default TodoList;