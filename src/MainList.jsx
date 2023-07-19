import React, { useEffect, useState } from "react";
import sun from "./assets/images/icon-sun.svg";
import TodoCard from "./TodoCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainList = () => {
  const [itemArray, setItemArray] = useState([]);
  const [task, setTask] = useState("");
  const [activeState, setActiveState] = useState("all");
  const [allItems, setAllItems] = useState([]);
  const getTask = (e) => {
    setTask(e.target.value);
  };
  useEffect(() => {
    setItemArray(allItems);
  }, [allItems]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && task !== "") {
      setAllItems([
        ...allItems,
        { id: itemArray.length + 1, desc: task, status: false },
      ]);
      setTask("");
      setActiveState("all");
      toast.success("Item Added Succesfully!");
    } else if (e.key === "Enter" && task === "") {
      toast.error("Please enter a task!");
    }
  };

  const markComplete = (id) => {
    setAllItems(
      allItems.map((item) => {
        if (item.id === id && item.status === false) {
          item.status = true;
        } else if (item.id === id && item.status === true) {
          item.status = false;
        }
        return item;
      })
    );
  };
  const changeDisplay = (state) => {
    switch (state) {
      case "active":
        setItemArray(
          allItems.filter((item) => {
            return item.status !== true;
          })
        );
        setActiveState("active");
        break;
      case "completed":
        setItemArray(
          allItems.filter((item) => {
            return item.status === true;
          })
        );
        setActiveState("completed");
        break;
      case "all":
        setItemArray(allItems);
        setActiveState("all");
        break;
    }
  };

  const clearCompleted = () => {
    setAllItems(
      allItems.filter((item) => {
        return item.status === false;
      })
    );
    toast.success("Completed items cleared!");
  };

  const deleteItem = (id) => {
    setAllItems(
      allItems.filter((item) => {
        return item.id !== id;
      })
    );
    toast.success("Item deleted!");
  };
  return (
    <>
      <div className="container">
        <header>
          <h1>TODO</h1>
          <img src={sun} alt="" />
        </header>
        <div className="todo-card">
          <div className="circle"></div>
          <input
            type="text"
            placeholder="Create a new todo..."
            onChange={getTask}
            onKeyDown={handleKeyDown}
            value={task}
          />
        </div>
        <TodoCard
          itemArray={itemArray}
          markComplete={markComplete}
          deleteItem={deleteItem}
        />
        <div className="todo-card card-footer">
          <p className="item-count">
            {itemArray.length === 1
              ? `${itemArray.length} item left`
              : `${itemArray.length} items left`}
          </p>
          <div className="item-filter">
            <button
              type="text"
              className={
                activeState === "all"
                  ? "btn filter-btn active-btn"
                  : "btn filter-btn hover-on-btn"
              }
              onClick={() => {
                changeDisplay("all");
              }}
            >
              All
            </button>
            <button
              type="text"
              className={
                activeState === "active"
                  ? "btn filter-btn active-btn"
                  : "btn filter-btn hover-on-btn"
              }
              onClick={() => {
                changeDisplay("active");
              }}
            >
              Active
            </button>
            <button
              type="text"
              className={
                activeState === "completed"
                  ? "btn filter-btn active-btn"
                  : "btn filter-btn hover-on-btn"
              }
              onClick={() => {
                changeDisplay("completed");
              }}
            >
              Completed
            </button>
          </div>
          <button className="clear-button btn" onClick={clearCompleted}>
            Clear Completed
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default MainList;
