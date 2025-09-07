import React from 'react';
import {Plus, Calendar, Flag, Tag, X} from 'lucide-react';
import {useTheme} from "../context/context";


const TodoForm: React.FC = () => {

    const {theme} = useTheme();


    return (
        <div
            className={`bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border  shadow-xl animate-fadeInUp ${
                theme === 'dark' ? 'bg-slate-900' : 'bg-white'
            }`}>

            <div className={`flex items-center justify-between mb-6 ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}>
                <h2 className={`text-xl font-bold  flex items-center gap-2 ${
                    theme === 'dark'
                        ? 'bg-gray-800/60 border-gray-700/50 text-white'
                        : 'bg-white/90 border-gray-200/50 text-gray-900'
                }`}>
                    <Plus className="h-5 w-5 text-blue-400"/>
                    New Tasks
                </h2>
            </div>

            <form className={`space-y-6 ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}>

                {/* Title Input */}
                <div className="space-y-2">
                    <label className={`block text-sm font-medium text-gray-300 ${
                        theme === 'dark' ? 'text-gray-300 ' : 'text-black'
                    }`}>Title *</label>
                    <input
                        type="text"
                        placeholder="Enter task title..."
                        className={`w-full  border border-gray-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 ${
                            theme === 'dark' ? 'bg-slate-900' : 'bg-none placeholder-black'
                        }`}
                    />
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <label className={`block text-sm font-medium text-gray-300 ${
                        theme === 'dark' ? 'text-gray-300 ' : 'text-black'
                    }`}>Description</label>
                    <textarea
                        rows={3}
                        placeholder="Detailed description (optional)..."
                        className={`w-full  border border-gray-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 ${
                            theme === 'dark' ? 'bg-slate-900' : 'bg-none placeholder-black  text-black'
                        }`}
                    />
                </div>

                {/* Form Row - Priority & Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Priority */}
                    <div className="space-y-2">
                        <label className={`flex text-sm font-medium text-gray-300  items-center gap-2 ${
                            theme === 'dark' ? 'text-gray-300 ' : 'text-black'
                        }`}>
                            <Flag className="h-4 w-4"/>
                            Priority
                        </label>
                        <select
                            className={` w-full  border border-gray-600/50 rounded-xl px-4 py-3 text-white focus:border-blue-500
                focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 ${
                                theme === 'dark' ? 'bg-slate-900' : 'bg-white placeholder-black  text-black'
                            }`}>
                            <option value="">Choose Priority</option>
                            <option value="high">Hight</option>
                            <option value="medium">Medum</option>
                            <option value="low">Low</option>
                        </select>
                    </div>
                    {/* Category */}
                    <div className="space-y-2">
                        <label className={`flex text-sm font-medium text-gray-300  items-center gap-2 ${
                            theme === 'dark' ? 'text-gray-300 ' : 'text-black'
                        }`}>
                            <Tag className="h-4 w-4"/>
                            Category
                        </label>
                        <select
                            className={` w-full  border border-gray-600/50 rounded-xl px-4 py-3 text-white focus:border-blue-500
                focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 ${
                                theme === 'dark' ? 'bg-slate-900' : 'bg-white placeholder-black  text-black'
                            }`}>
                            <option value="">Chose Category</option>
                            <option value="General">General</option>
                            <option value="Personal">Personal</option>
                            <option value="Developer">Developers</option>
                            <option value="Desing">Desing</option>
                            <option value="Marketing">Marketing</option>
                        </select>
                    </div>
                </div>

                {/* Due Date */}
                <div className="space-y-2">
                    <label className={`flex text-sm font-medium text-gray-300  items-center gap-2 ${
                        theme === 'dark' ? 'text-gray-300 ' : 'text-black'
                    }`}>
                        <Tag className={`h-5 w-5 `}/>
                        Completion date
                    </label>
                    <input
                        type="date"
                        placeholder="Enter task title..."
                        className={`w-full  border border-gray-600/50 rounded-xl px-4 py-3   placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 ${
                            theme === 'dark' ? 'bg-slate-900' : 'bg-none placeholder-black'
                        }`}
                    />
                </div>

                {/* Tags */}
                <div className="space-y-2">
                    <label className={`flex text-sm font-medium text-gray-300  items-center gap-2 ${
                        theme === 'dark' ? 'text-gray-300 ' : 'text-black'
                    }`}>
                        <Tag className={`h-5 w-5 `}/>
                       Tags
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">

            <span className={`inline-flex items-center gap-1 bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm border border-blue-500/30
             ${theme === 'dark' ? 'bg-blue-500/20    ' : 'bg-blue-700  text-gray-50 '}
            `}>
              #Fast
              <X className="h-3 w-3 cursor-pointer hover:text-blue-200" />
            </span>
                        <span className={`inline-flex items-center gap-1 bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm border border-green-500/30
                         ${theme === 'dark' ? 'bg-green-500/20' : 'bg-green-400 text-gray-50'}
                        `}>
              #Important
              <X className="h-3 w-3 cursor-pointer hover:text-green-200" />
            </span>
                    </div>
                    <input
                        type="text"
                        placeholder="Enter task title..."
                        className={`w-full  border border-gray-600/50 rounded-xl px-4 py-3   placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 ${
                            theme === 'dark' ? 'bg-slate-900' : 'bg-none placeholder-black'
                        }`}
                    />
                </div>

                {/* Form Actions */}
                <div className= {`flex flex-col sm:flex-row gap-3 pt-4 
                   ${ theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}>
                    <button
                        type="submit"
                        className={`flex-1 bg-gradient-primary text-white font-medium py-3 px-6 rounded-xl hover:shadow-lg btn-hover flex items-center justify-center gap-2
                         ${theme === 'dark' ? 'bg-green-500' : 'bg-green-500 '}
                        `}
                    >
                        <Plus className="h-4 w-4" />
                        Add New Task
                    </button>
                    <button
                        type="button"
                        className={`sm:w-auto  text-gray-300 font-medium py-3 px-6 rounded-xl hover:bg-red-600/50   border border-red-600/50
                         ${theme === 'dark' ? 'bg-red-500' : 'bg-red-500 '}
                        `}
                    >
                        Cancel
                    </button>
                </div>

            </form>

        </div>
    )
}


export default TodoForm;