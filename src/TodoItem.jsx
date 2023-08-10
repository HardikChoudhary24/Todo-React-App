import React, { useEffect } from "react";
import check from "./assets/images/icon-check.svg";
import cross from "./assets/images/icon-cross.svg";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/Md";
import { IconContext } from "react-icons";
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
        className={item.isDone === true ? "circle completed" : "circle"}
        onClick={() => markComplete(item.id)}
      >
        {item.isDone === true && <img src={check} alt="" />}
      </button>
      <p
        className={item.isDone === true ? "completed-text" : "normal-text"}
        onClick={() => markComplete(item.id)}
      >
        {item.title}
      </p>
      {isShown && (
        <button className="delete-task" onClick={() => deleteItem(item.id)}>
          {/* <img src={cross} alt="" /> */}
          <IconContext.Provider
            value={{
              color: "hsl(237, 14%, 26%)",
              className: "global-class-name",
              size: "1.6rem",
            }}
          >
            <MdDeleteForever />
          </IconContext.Provider>
          ;
        </button>
      )}
    </div>
  );
};

export default TodoItem;
