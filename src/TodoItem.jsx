import React, { useEffect } from "react";
import check from "./assets/images/icon-check.svg";
import cross from "./assets/images/icon-cross.svg";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/Md";
import { IconContext } from "react-icons";
import CircularProgress from "@mui/material/CircularProgress";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import fetchData from "./utils";


const TodoItem = ({ item, index, deleteItem, setActiveState }) => {
  const [isShown, setIsShown] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: updateTasks, isLoading: isLoadingUpdate } = useMutation({
    mutationFn: (id, status) =>
      fetchData.patch(`/update/${id}`, null, {
        headers: { Authorization: `Beare ${localStorage.getItem("token")}` },
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setActiveState("all")
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const markComplete = (id) => {
    updateTasks(id);
  };

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
      {isLoadingUpdate ? (
        <div className="loader">
          <CircularProgress size={22} />
        </div>
      ) : (
        <button
          className={item.isDone === true ? "circle completed" : "circle"}
          onClick={() => markComplete(item._id)}
        >
          {item.isDone === true && <img src={check} alt="" />}
        </button>
      )}

      <p
        className={item.isDone === true ? "completed-text" : "normal-text"}
        onClick={() => markComplete(item._id)}
      >
        {item.description}
      </p>
      {isShown && (
        <button className="delete-task" onClick={() => deleteItem(item._id)}>
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
