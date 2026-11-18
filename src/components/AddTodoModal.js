import React, { useRef, useEffect } from 'react';

const AddTodoModal = React.memo(({ todo, onSave, onClose }) => {
    // useRef: доступ к input без state, ввод не вызывает перерисовок
    const inputRef = useRef(null);
    const isEdit = Boolean(todo);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handleSave = () => {
        const title = inputRef.current.value.trim();
        if (!title) return; // пустое название не сохраняем
        onSave(title);
        onClose();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSave();
        if (e.key === 'Escape') onClose();
    };

    return (
        <div className="modal" onClick={onClose}>
            {/* stopPropagation: клик внутри окна не закрывает его */}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h3>{isEdit ? 'Редактировать задачу' : 'Добавить задачу'}</h3>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Название задачи"
                    defaultValue={todo ? todo.title : ''}
                    onKeyDown={handleKeyDown}
                />
                <div className="modal-actions">
                    <button onClick={onClose}>Отмена</button>
                    <button onClick={handleSave}>
                        {isEdit ? 'Сохранить' : 'Добавить'}
                    </button>
                </div>
            </div>
        </div>
    );
});

export default AddTodoModal;