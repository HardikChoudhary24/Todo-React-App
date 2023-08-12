import  TodoItem  from './TodoItem';
import React, { useState } from 'react'

const TodoCard = ({ itemArray, deleteItem,setActiveState }) => {
  return (
    <>
      {itemArray.map((item, index) => {
        return (
          <TodoItem
            key={index}
            item={item}
            index={index}
            deleteItem={deleteItem}
            setActiveState={setActiveState}
          />
        );
      })}
    </>
  );
};

export default TodoCard
// markComplete
//isLoadingUpdate