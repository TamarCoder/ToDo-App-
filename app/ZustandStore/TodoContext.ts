import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";

interface Todo {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    priority: 'high' | 'medium' | 'low';
    category: string;
    dueDate?: string;
    tags: string[];
    createdAt: string;
    updatedAt: string;
}

// Categories როგორც string union type
type CategoryType = 'general' | 'personal' | 'developers' | 'design' | 'marketing';

interface FilterState {
    status: 'all' | 'active' | 'completed' | 'overdue';
    priority: 'all' | 'high' | 'medium' | 'low';
    category: CategoryType | 'all';
    searchQuery: string;
    tags: string[];
    dateRange: 'all' | 'today' | 'tomorrow' | 'this-week' | 'next-week' | 'overdue';
}

interface TodoStats {
    total: number;
    completed: number;
    active: number;
    overdue: number;
    completionRate: number;
}

interface CreateTodoInput {
    title: string;
    description?: string;
    priority?: 'high' | 'medium' | 'low';
    category?: CategoryType;
    dueDate?: string;
    tags?: string[];
}

interface TodoState {
    todos: Todo[];
    filterState: FilterState;

    // Todo
    addTodo:    (input: CreateTodoInput) => void;
    deleteTodo: (id: string) => void;
    updateTodo: (id: string, updates: Partial<Todo>) => void;
    toggleTodo: (id: string) => void;

    // Filter functions
    setCategoryFilter: (category: CategoryType | 'all') => void;
    setStatusFilter: (status: FilterState['status']) => void;
    setPriorityFilter: (priority: FilterState['priority']) => void;
    setSearchQuery: (searchQuery: string) => void;
    setDateRangeFilter: (dateRange: FilterState['dateRange']) => void;
    addTagFilter: (tag: string) => void;
    removeTagFilter: (tag: string) => void;
    clearFilters: () => void;

    // Getters
    getFilteredTodos: () => Todo[];
    getTodoStats: () => TodoStats;
    getOverdueTodos: () => Todo[];
    getTodosByCategory: (category: CategoryType) => Todo[];
}

const defaultFilterState: FilterState = {
    status: 'all',
    priority: 'all',
    category: 'all',
    searchQuery: '',
    tags: [],
    dateRange: 'all'
};

const useTodoStore = create<TodoState>()(
    persist(
        (set, get) => ({
            todos: [],
            filterState: defaultFilterState,

            // Todo CRUD operations
            addTodo: (input: CreateTodoInput) => set((state) => {
                const newTodo: Todo = {
                    id: nanoid(),
                    title: input.title,
                    description: input.description || '',
                    completed: false,
                    priority: input.priority || 'medium',
                    category: input.category || 'general',
                    dueDate: input.dueDate,
                    tags: input.tags || [],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };

                return {
                    todos: [...state.todos, newTodo]
                };
            }),

            deleteTodo: (id: string) => set((state) => ({
                todos: state.todos.filter(todo => todo.id !== id)
            })),

            updateTodo: (id: string, updates: Partial<Todo>) => set((state) => ({
                todos: state.todos.map(todo =>
                    todo.id === id
                        ? { ...todo, ...updates, updatedAt: new Date().toISOString() }
                        : todo
                )
            })),

            toggleTodo: (id: string) => set((state) => ({
                todos: state.todos.map(todo =>
                    todo.id === id
                        ? {
                            ...todo,
                            completed: !todo.completed,
                            updatedAt: new Date().toISOString()
                        }
                        : todo
                )
            })),

            // Filter functions
            setCategoryFilter: (category: CategoryType | 'all') => set((state) => ({
                filterState: { ...state.filterState, category }
            })),

            setStatusFilter: (status: FilterState['status']) => set((state) => ({
                filterState: { ...state.filterState, status }
            })),

            setPriorityFilter: (priority: FilterState['priority']) => set((state) => ({
                filterState: { ...state.filterState, priority }
            })),

            setSearchQuery: (searchQuery: string) => set((state) => ({
                filterState: { ...state.filterState, searchQuery }
            })),

            setDateRangeFilter: (dateRange: FilterState['dateRange']) => set((state) => ({
                filterState: { ...state.filterState, dateRange }
            })),

            addTagFilter: (tag: string) => set((state) => ({
                filterState: {
                    ...state.filterState,
                    tags: [...state.filterState.tags, tag]
                }
            })),

            removeTagFilter: (tag: string) => set((state) => ({
                filterState: {
                    ...state.filterState,
                    tags: state.filterState.tags.filter(t => t !== tag)
                }
            })),

            clearFilters: () => set({
                filterState: defaultFilterState
            }),

            // Getters
            getFilteredTodos: () => {
                const { todos, filterState } = get();

                return todos.filter(todo => {
                    // Status filter
                    if (filterState.status !== 'all') {
                        const now = new Date();
                        const dueDate = todo.dueDate ? new Date(todo.dueDate) : null;

                        switch (filterState.status) {
                            case 'active':
                                if (todo.completed) return false;
                                break;
                            case 'completed':
                                if (!todo.completed) return false;
                                break;
                            case 'overdue':
                                if (!dueDate || dueDate > now || todo.completed) return false;
                                break;
                        }
                    }

                    // Priority filter
                    if (filterState.priority !== 'all' && todo.priority !== filterState.priority) {
                        return false;
                    }

                    // Category filter
                    if (filterState.category !== 'all' && todo.category !== filterState.category) {
                        return false;
                    }

                    // Search query
                    if (filterState.searchQuery) {
                        const query = filterState.searchQuery.toLowerCase();
                        const matchesTitle = todo.title.toLowerCase().includes(query);
                        const matchesDescription = todo.description?.toLowerCase().includes(query);
                        if (!matchesTitle && !matchesDescription) return false;
                    }

                    // Tag filter
                    if (filterState.tags.length > 0) {
                        const hasMatchingTag = filterState.tags.some(tag =>
                            todo.tags.includes(tag)
                        );
                        if (!hasMatchingTag) return false;
                    }

                    // Date range filter
                    if (filterState.dateRange !== 'all' && todo.dueDate) {
                        const now = new Date();
                        const dueDate = new Date(todo.dueDate);

                        switch (filterState.dateRange) {
                            case 'today':
                                if (dueDate.toDateString() !== now.toDateString()) return false;
                                break;
                            case 'tomorrow':
                                const tomorrow = new Date(now);
                                tomorrow.setDate(tomorrow.getDate() + 1);
                                if (dueDate.toDateString() !== tomorrow.toDateString()) return false;
                                break;
                            case 'this-week':
                                const weekStart = new Date(now);
                                weekStart.setDate(now.getDate() - now.getDay());
                                const weekEnd = new Date(weekStart);
                                weekEnd.setDate(weekStart.getDate() + 6);
                                if (dueDate < weekStart || dueDate > weekEnd) return false;
                                break;
                            case 'overdue':
                                if (dueDate >= now || todo.completed) return false;
                                break;
                        }
                    }

                    return true;
                });
            },

            getTodoStats: (): TodoStats => {
                const { todos } = get();
                const now = new Date();

                const completed = todos.filter(todo => todo.completed).length;
                const active = todos.filter(todo => !todo.completed).length;
                const overdue = todos.filter(todo => {
                    if (todo.completed || !todo.dueDate) return false;
                    return new Date(todo.dueDate) < now;
                }).length;

                return {
                    total: todos.length,
                    completed,
                    active,
                    overdue,
                    completionRate: todos.length > 0 ? (completed / todos.length) * 100 : 0
                };
            },

            getOverdueTodos: () => {
                const { todos } = get();
                const now = new Date();

                return todos.filter(todo => {
                    if (todo.completed || !todo.dueDate) return false;
                    return new Date(todo.dueDate) < now;
                });
            },

            getTodosByCategory: (category: CategoryType) => {
                const { todos } = get();
                return todos.filter(todo => todo.category === category);
            }
        }),
        {
            name: 'todo-storage',
            skipHydration: false,  // ← ან ეს დაამატეთ
            partialize: (state) => ({
                todos: state.todos,
                filterState: state.filterState
            }),
        }
    )
);

export { useTodoStore };
export type { Todo, CategoryType, FilterState, TodoStats, CreateTodoInput };