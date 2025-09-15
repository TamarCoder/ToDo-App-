"use client";
import { useTheme } from "./components/context/context";
import Header from "./components/Header/Header";
import StatsCard from "./components/StatsCard/StatsCard";
import TodoForm from "./components/TodoForm/TodoForm";
import FilterBar from "./components/FilterBar/FilterBar";
import TodoList from "./components/TodoList/TodoList";
import DeleteModal from "./components/DeleteModal/DeleteModal";
import { useState } from "react";

export default function Home() {
  const { theme } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState<string | null>(null);

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        theme === "dark" ? "bg-slate-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <StatsCard />
          <TodoForm />
          <FilterBar />
          <TodoList />
        </div>
      </main>
      {showModal && (
        <DeleteModal
          todoId={selectedTodoId}
          onClose={() => setShowModal(false)}
          onConfirm={(id) => {
            // You could show a toast or update state here
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}
