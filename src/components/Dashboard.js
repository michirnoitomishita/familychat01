import React, { useContext, useEffect, useState } from "react";
import * as Api from "../service/api";
import { signInWithGoogle } from "../service/firebase";
import { AuthContext } from "../provider/AuthProvider";
import ToDoList from "../components/ToDoList";
import axios from 'axios';


// axiosやその他の変数・関数もここで定義します

const API_URL = 'https://api.openai.com/v1/';
const MODEL = 'gpt-3.5-turbo';
const API_KEY = 'CHATGPTのAPIキーがはいります';



const Dashboard = () => {
  const currentUser = useContext(AuthContext);
  const [inputName, setInputName] = useState('');
  const [todos, setTodos] = useState([]);
  const [motivation, setMotivation] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

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
      setInputName('');
      fetchTodos();
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await Api.todoDelete(id);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  //自動音声入力API
  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'ja-JP'; // Set the language to Japanese
      recognition.start();

      recognition.onresult = (event) => {
        const result = event.results[event.resultIndex][0].transcript;
        setInputName(result);
      };

      recognition.onerror = (event) => {
        console.error(event.error);
      };
    } else {
      console.error('このブラウザは音声認識をサポートしていません。');
    }
  };

  const handleCommentSubmission = async () => {
    const latestTodo = todos[todos.length - 1];
    const message = latestTodo.content;

    // チャットGPT APIを使用してコメントを送信
    const response = await chat(message);

    // レスポンスを処理する（例えば、表示するなど）
    console.log('チャットGPTの応答:', response);

    // モチベーションを設定
    setMotivation(response);
  };

  // 以下の部分を追加します
  useEffect(() => {
    if (motivation) {
      setResponseMessage(motivation);
    }
  }, [motivation]);

  const renderForm = () => {
    if (currentUser?.currentUser?.uid) {
      return (
        <form>
          <input
            style={{ width: '100%', height: '80px', wordWrap: 'break-word' }}
            placeholder='ここに書いてね'
            value={inputName}
            onChange={handleInputChange}
          />
          <button type='button' onClick={handleAddTodo}>
            追加
          </button>
          <button type='button' onClick={handleVoiceInput}>
            自動音声入力
          </button>
          <button type='button' onClick={handleCommentSubmission}>
            送信
          </button>
          {/* responseMessageの値にかかわらず、フォームは表示されます */}
          {/* <p>チャットGPTの応答: {responseMessage}</p> */}
          <p>今の気持ち: {responseMessage}</p>
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
      {/* {todos.length === 0 && <p>メッセージはありません</p>} */}
    </div>
  );
};

// チャットGPT　API


export const chat = async (message) => {
  try {
    const response = await axios.post(
      `${API_URL}chat/completions`,
      {
        // モデル ID の指定
        model: MODEL,
        // 質問内容
        messages: [
          {
            role: 'user',
            // content: message,
            content: message,
          },
        ],
      },
      {
        // 送信する HTTP ヘッダー(認証情報)
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    // 回答の取得
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(error);
    return null;
  }
};





export default Dashboard;
