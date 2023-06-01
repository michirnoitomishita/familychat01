import React, { useContext, useEffect, useState } from "react";
import * as Api from "../service/api";
import { signInWithGoogle } from "../service/firebase";
import { AuthContext } from "../provider/AuthProvider";
import { Toolbar, Typography, Button } from "@mui/material";
import { Add } from "@mui/icons-material";

const ToDoList = (props) => {
  const { todos, fetch } = props; // todosとfetchをpropsから受け取る

  const handleDelete = async (id) => {
    try {
      await props.onDelete(id); // onDeleteプロップスを介して削除イベントを呼び出す
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const renderTodoList = () => {
    if (todos.length === 0) {
      return <p>タスクはありません。</p>;
    } else {
      return (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.content}
              <button type="button" onClick={() => handleDelete(todo.id)}>
                削除
              </button>
            </li>
          ))}
        </ul>
      );
    }
  };

  return (
    <div>
      <h2>あなたのToDo</h2>
      {renderTodoList()}
    </div>
  );
};

export default ToDoList;
