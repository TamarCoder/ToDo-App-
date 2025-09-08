
"use client"
import React from 'react';
import { X, Trash2, AlertTriangle } from 'lucide-react';


const DeleteModal: React.FC = () => {



    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">

                {/* Modal */}
                <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700/50 max-w-md w-full animate-bounceIn">

                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
                        <div className="flex items-center gap-3">
                            <div className="bg-red-500/20 p-2 rounded-xl">
                                <AlertTriangle className="h-6 w-6 text-red-400" />
                            </div>
                            <h2 className="text-xl font-bold text-white">Delete Task</h2>
                        </div>
                        <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg btn-hover">
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
                            <div className="bg-gray-700/50 rounded-xl p-4 border border-gray-600/50">
                                <h3 className="text-white font-medium mb-2">Task to be deleted:</h3>
                                <div className="space-y-2">
                                    <p className="text-gray-300 font-medium">Complete a React project</p>
                                    <p className="text-gray-400 text-sm">ToDo app completion and testing</p>
                                    <div className="flex items-center gap-4 text-xs">
                    <span className="bg-red-500/20 text-red-300 px-2 py-1 rounded-full border border-red-500/30">
                      High priority
                    </span>
                                        <span className="text-gray-400">📅 Dec 25, 2054</span>
                                        <span className="text-gray-400">💼 Medum</span>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Options */}
                            <div className="space-y-3">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                                    />
                                    <span className="text-gray-300 text-sm">
                   Also delete all related subtasks.
                  </span>
                                </label>

                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                                    />
                                    <span className="text-gray-300 text-sm">
                  Keep backups until deleted (30 days)
                  </span>
                                </label>
                            </div>

                            {/* Statistics */}
                            <div className="bg-gray-700/30 rounded-lg p-3 text-center">
                                <p className="text-gray-400 text-xs">
                                    This will be yours. <span className="text-white font-medium">5th</span> deleted task this month
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 p-6 pt-0">
                        <button className="flex-1 bg-gray-700/50 text-gray-300 font-medium py-3 px-6 rounded-xl hover:bg-gray-600/50 btn-hover border border-gray-600/50">
                            cancel
                        </button>
                        <button className="flex-1 bg-gradient-danger text-white font-medium py-3 px-6 rounded-xl hover:shadow-lg btn-hover flex items-center justify-center gap-2">
                            <Trash2 className="h-4 w-4" />
                            Remove
                        </button>
                    </div>

                    {/* Alternative Actions */}
                    <div className="px-6 pb-6">
                        <div className="border-t border-gray-700/50 pt-4">
                            <p className="text-center text-sm text-gray-400 mb-3">
                                Or try these alternatives:
                            </p>
                            <div className="flex flex-wrap gap-2 justify-center">
                                <button className="text-xs bg-blue-500/20 text-blue-300 px-3 py-1.5 rounded-lg hover:bg-blue-500/30 btn-hover border border-blue-500/30">
                                    Mark as completed
                                </button>
                                <button className="text-xs bg-yellow-500/20 text-yellow-300 px-3 py-1.5 rounded-lg hover:bg-yellow-500/30 btn-hover border border-yellow-500/30">
                                    Move to archive
                                </button>
                                <button className="text-xs bg-purple-500/20 text-purple-300 px-3 py-1.5 rounded-lg hover:bg-purple-500/30 btn-hover border border-purple-500/30">
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