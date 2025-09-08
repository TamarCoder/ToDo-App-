
"use client"
import {useTheme} from "./components/context/context";
import Header from "./components/Header/Header";
import StatsCard from "./components/StatsCard/StatsCard";
import TodoForm from "./components/TodoForm/TodoForm";
import FilterBar from "./components/FilterBar/FilterBar";
import TodoList from "./components/TodoList/TodoList";
import DeleteModal from "./components/DeleteModal/DeleteModal";


export default function Home() {
    const { theme } = useTheme();

    return (
        <div className={`min-h-screen transition-all duration-300 ${
            theme === 'dark'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-gray-900'
        }`}>
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="space-y-8">
                    <StatsCard/>
                    <TodoForm/>
                    <FilterBar/>
                    <TodoList/>
                </div>
            </main>

            {/*<DeleteModal />*/}
        </div>


    )
}