import  TodoItem  from './TodoItem';
import React, { useState } from 'react'

const TodoCard = ({ itemArray ,markComplete ,deleteItem}) => {  
  return (
    <>
      {itemArray.map((item, index) => {
        return (
          <TodoItem key={index} item={item} index={index} markComplete={markComplete} deleteItem={deleteItem}/>
        );
      })}
    </>
  );
};

export default TodoCard
