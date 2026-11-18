import React, { useMemo } from 'react';

const TodoList = React.memo(({ todos, onToggle, onDelete, onEdit }) => {
    // useMemo: список пересобирается только при изменении todos или обработчиков
    const renderedTodos = useMemo(() => {
        return todos.map((todo) => (
            <div
                key={todo.id}
                className={`todo-item ${todo.completed ? 'completed' : ''}`}
            >
                {/* Чекбокс: отметить задачу выполненной */}
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                />
                <span className="todo-title">{todo.title}</span>

                <div className="todo-actions">
                    {/* Редактирование: передаём всю задачу наверх */}
                    <button
                        className="icon-btn"
                        title="Редактировать"
                        onClick={() => onEdit(todo)}
                    >
                        ✎
                    </button>
                    {/* Удаление: передаём только id */}
                    <button
                        className="icon-btn danger"
                        title="Удалить"
                        onClick={() => onDelete(todo.id)}
                    >
                        ✕
                    </button>
                </div>
            </div>
        ));
    }, [todos, onToggle, onDelete, onEdit]);

    return <div className="todo-list">{renderedTodos}</div>;
});

export default TodoList;