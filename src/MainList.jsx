import React, { useEffect, useState } from "react";
import sun from "./assets/images/icon-sun.svg";
import TodoCard from "./TodoCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import fetchData from "./utils";
// import { authToken } from "./Pages/Login";
import { TbLogout } from "react-icons/Tb";
import { BiSolidPaperPlane } from "react-icons/Bi";
import { redirect, useNavigate } from "react-router-dom";

const MainList = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  let dataArray = [];

  const [itemArray, setItemArray] = useState([]);
  const [task, setTask] = useState("");
  const [activeState, setActiveState] = useState("all");

  const getTask = (e) => {
    setTask(e.target.value);
  };

  //to get all the items from the server
  const {
    data,
    isLoading: isLoadingGet,
    isError,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: () =>
      fetchData.get(`/`, {
        headers: { Authorization: `Beare ${localStorage.getItem("token")}` },
      }),
  });
  dataArray = isLoadingGet ? [] : data.data;

  useEffect(() => {
    setItemArray(dataArray);
  }, [dataArray]);

  //to post the items on the server
  const { mutate: postItem, isLoading: isLoadingPost } = useMutation({
    mutationFn: (taskItem) =>
      fetchData.post(
        "",
        { title: taskItem },
        { headers: { Authorization: `Beare ${localStorage.getItem("token")}` } }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Item Added Succesfully!");
      setTask("");
    },
  });

  //to update the tasks status
  const { mutate: updateTasks } = useMutation({
    mutationFn: (id, status) =>
      fetchData.patch(`/update/${id}`, null, {
        headers: { Authorization: `Beare ${localStorage.getItem("token")}` },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  //to delete the tasks
  const { mutate: deleteTasks } = useMutation({
    mutationFn: (id) =>
      fetchData.delete(`/delete/${id}`,{
        headers: { Authorization: `Beare ${localStorage.getItem("token")}` },
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Item deleted!");
    },
    onError: (error) => {
      console.log(error);
    },
  });
  //to delete completed tasks
  const { mutate: deleteCompletedTasks } = useMutation({
    mutationFn: () =>
      fetchData.delete("/deleteCompleted",{
        headers: { Authorization: `Beare ${localStorage.getItem("token")}` },
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Completed items cleared!");
    },
  });

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && task !== "") {
      postItem(task);
    } else if (e.key === "Enter" && task === "") {
      toast.error("Please enter a task!");
    }
  };

  const markComplete = (id) => {
    updateTasks(id);
  };
  const handleClick = ()=>{
    if (task !== "") {
      postItem(task);
    } else if (task === "") {
      toast.error("Please enter a task!");
    }
  }

  const changeDisplay = (state) => {
    switch (state) {
      case "active":
        setItemArray(
          dataArray.filter((item) => {
            return item.isDone !== true;
          })
        );
        setActiveState("active");
        break;
      case "completed":
        setItemArray(
          dataArray.filter((item) => {
            return item.isDone === true;
          })
        );
        setActiveState("completed");
        break;
      case "all":
        setItemArray(dataArray);
        setActiveState("all");
        break;
    }
  };

  const clearCompleted = () => {
    // setItemArray(
    //   itemArray.filter((item) => {
    //     return item.isDone === false;
    //   })
    // );

    deleteCompletedTasks();
  };

  const deleteItem = (id) => {
    deleteTasks(id);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/Todo-React-App/");
  };
  return (
    <div className="main-container">
      <div className="container">
        <header>
          <h1>TODO</h1>
          {/* <img src={sun} alt="" /> */}
        </header>
        <div className="todo-card">
          {/* <div className="circle"></div> */}
          <input
            type="text"
            placeholder={`👋 Hello ${localStorage?.getItem("name")?.[0]?.toUpperCase()+localStorage?.getItem("name")?.slice(1)}, What to do Today?`}
            onChange={getTask}
            onKeyDown={handleKeyDown}
            value={task}
            disabled={isLoadingPost}
          />
          <button className="go-btn" onClick={handleClick}>
            <BiSolidPaperPlane color="hsl(220, 98%, 61%)" />
          </button>
        </div>

        <TodoCard
          itemArray={itemArray}
          markComplete={markComplete}
          deleteItem={deleteItem}
        />

        <div className="todo-card card-footer">
          <p className="item-count">
            {dataArray.length === 1
              ? `${dataArray.length} item left`
              : `${dataArray.length} items left`}
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
      <button className="logout-btn" onClick={logout}>
        <p>Logout </p>{" "}
        <div className="logout-img">
          <TbLogout />
        </div>
      </button>
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
    </div>
  );
};

export default MainList;
