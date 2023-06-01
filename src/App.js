import React from "react";
import AuthProvider from "./provider/AuthProvider";
import "./App.css";
import "./service/firebase";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <AuthProvider>
      <Header />
      <Dashboard />
      {/* TODOを表示するコンポーネント */}
      {/* フッター */}
    </AuthProvider>
  );
}

export default App;
