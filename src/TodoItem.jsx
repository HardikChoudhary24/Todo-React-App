import React from 'react'
import check from "./assets/images/icon-check.svg";
import cross from "./assets/images/icon-cross.svg";
import { useState } from "react";

const TodoItem = ({ item, index, markComplete, deleteItem }) => {
  const [isShown, setIsShown] = useState(false);
  return (
    <div
      className={
        index === 0 ? "todo-card todo-item first-item" : "todo-card todo-item "
      }
      key={index}
      onMouseEnter={() => {
        setIsShown(true);
      }}
      onMouseLeave={() => {
        setIsShown(false);
      }}
    >
      <button
        className={item.status === true ? "circle completed" : "circle"}
        onClick={() => markComplete(item.id)}
      >
        {item.status === true && <img src={check} alt="" />}
      </button>
      <p
        className={item.status === true ? "completed-text" : "normal-text"}
        onClick={() => markComplete(item.id)}
      >
        {item.desc}
      </p>
      {isShown && (
        <button className="delete-task" onClick={() => deleteItem(item.id)}>
          <img src={cross} alt="" />
        </button>
      )}
    </div>
  );
};

export default TodoItem
