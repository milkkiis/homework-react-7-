import React, { useState, useCallback } from 'react';
import TodoList from './components/TodoList';
import AddTodoModal from './components/AddTodoModal';
import './App.css';

function App() {
    const [todos, setTodos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTodo, setEditingTodo] = useState(null);

    // Добавление новой задачи
    const addTodo = useCallback((title) => {
        setTodos((prev) => [...prev, { id: Date.now(), title, completed: false }]);
    }, []);

    // Удаление: оставляем все задачи, кроме выбранной
    const deleteTodo = useCallback((id) => {
        setTodos((prev) => prev.filter((t) => t.id !== id));
    }, []);

    // Переключение статуса выполнено / не выполнено
    const toggleTodo = useCallback((id) => {
        setTodos((prev) =>
            prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
        );
    }, []);

    // Сохранение названия при редактировании
    const updateTodo = useCallback((id, title) => {
        setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, title } : t)));
    }, []);

    // Открытие модалки в режиме добавления
    const openAddModal = useCallback(() => {
        setEditingTodo(null);
        setIsModalOpen(true);
    }, []);

    // Открытие модалки в режиме редактирования
    const openEditModal = useCallback((todo) => {
        setEditingTodo(todo);
        setIsModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
        setEditingTodo(null);
    }, []);

    // Единый обработчик сохранения: решает, добавить или обновить
    const handleSave = useCallback(
        (title) => {
            if (editingTodo) updateTodo(editingTodo.id, title);
            else addTodo(title);
        },
        [editingTodo, addTodo, updateTodo]
    );

    return (
        <div className="app">
            <h1>Список задач</h1>
            <button className="add-todo-button" onClick={openAddModal}>
                Добавить задачу
            </button>
            <TodoList
                todos={todos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={openEditModal}
            />
            {isModalOpen && (
                <AddTodoModal
                    todo={editingTodo}
                    onSave={handleSave}
                    onClose={closeModal}
                />
            )}
        </div>
    );
}

export default App;