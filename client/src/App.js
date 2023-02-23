import React from 'react'
import ChatBot from './components/ChatBot';
import { ChatProvider } from './context/chatContext';

function App() {
  return (
    <ChatProvider>
      <ChatBot />
    </ChatProvider>
  );
}

export default App;
