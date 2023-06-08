import React, { useContext, useEffect, useState } from 'react';
import * as Api from '../service/api';
import { signInWithGoogle } from '../service/firebase';
import { AuthContext } from '../provider/AuthProvider';
import { Toolbar, Typography, Button, TextField } from '@mui/material';
import { Add } from '@mui/icons-material';




const ToDoList = (props) => {
  const { todos, onDelete } = props; // todosとonDeleteをpropsから受け取る
  const handleDelete = async (id) => {
    try {
      await onDelete(id); // onDeleteプロップスを介して削除イベントを呼び出す
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  const renderTodoList = () => {
    if (todos.length === 0) {
      return <p>メッセージはありません。</p>;
    } else {
      return (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              
              <p>{todo.content}</p>
              <p>{convertTimestampToDatetime(todo.createdAt)}</p>{' '}
              {/* 日時を表示 */}
              <button type='button' onClick={() => handleDelete(todo.id)}>
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
      <h2>今日あったこととか感じたこととか伝えたいこととか・・・</h2>

    
      {renderTodoList()}
    </div>
  );
};

export default ToDoList;

function convertTimestampToDatetime(timestamp) {
  const _d = timestamp ? new Date(timestamp * 1000) : new Date();
  const Y = _d.getFullYear();
  const m = (_d.getMonth() + 1).toString().padStart(2, '0');
  const d = _d.getDate().toString().padStart(2, '0');
  const H = _d.getHours().toString().padStart(2, '0');
  const i = _d.getMinutes().toString().padStart(2, '0');
  const s = _d.getSeconds().toString().padStart(2, '0');
  return `${Y}/${m}/${d} ${H}:${i}:${s}`;
}
