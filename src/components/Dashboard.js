import React, { useContext, useEffect, useState } from "react";
import * as Api from "../service/api";
import { signInWithGoogle } from "../service/firebase";
import { AuthContext } from "../provider/AuthProvider";
import ToDoList from "../components/ToDoList";

const Dashboard = () => {
  const currentUser = useContext(AuthContext);
  const [inputName, setInputName] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, [currentUser]);

  const fetchTodos = async () => {
    if (currentUser?.currentUser?.uid) {
      const data = await Api.initGet(currentUser.currentUser.uid);
      setTodos(data);
    }
  };

  const handleInputChange = (event) => {
    setInputName(event.target.value);
  };

  const handleAddTodo = async () => {
    if (inputName) {
      await Api.addTodo(inputName, currentUser?.currentUser?.uid);
      setInputName("");
      fetchTodos();
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await Api.todoDelete(id);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const renderForm = () => {
    if (currentUser?.currentUser?.uid) {
      return (
        <form>
          <input
            placeholder="TodoName"
            value={inputName}
            onChange={handleInputChange}
          />
          <button type="button" onClick={handleAddTodo}>
            追加
          </button>
        </form>
      );
    } else {
      // return <button onClick={signInWithGoogle}>ログイン</button>;
    }
  };

  return (
    <div>
      {renderForm()}
      <ToDoList todos={todos} onDelete={handleDeleteTodo} />
      {todos.length === 0 && <p>タスクはありません。</p>}
    </div>
  );
};

export default Dashboard;
