import React, { useState } from "react";
interface todo {
  id: number;
  text: string;
  complete: boolean;
}

export const TodoItem: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [todos, setTodos] = useState<todo[]>([
    {
      id: 2,
      text: "I love my Chillisten",
      complete: false,
    },
    {
      id: 1,
      text: "I love my Chill",
      complete: false,
    },
  ]);

  const toggleHandler = (id: number) => {
    setTodos(
      todos.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            complete: !item.complete,
          };
        }
        return item;
      })
    );
  };

  const deleteItem = (id: number) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputValue === "") {
      return todos;
    } else {
      const newTodo: todo = {
        id: Date.now(),
        text: inputValue,
        complete: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  return (
    <form onSubmit={(event) => onSubmitHandler(event)}>
      <input
        type="text"
        placeholder="Enter your todo item "
        value={inputValue}
        onChange={(e) => setInputValue(e.currentTarget.value)}
      />
      <button type="submit">Add todo</button>
      <div>
        {todos.map((todoItem) => {
          return (
            <div key={todoItem.id} className="mainContainer">
              <li
                onClick={() => toggleHandler(todoItem.id)}
                style={{
                  textDecoration: todoItem.complete ? "line-through" : "none",
                }}
              >
                {todoItem.text}
              </li>
              <button onClick={() => deleteItem(todoItem.id)}>Delete</button>
            </div>
          );
        })}
      </div>
    </form>
  );
};
