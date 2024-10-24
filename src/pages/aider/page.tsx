import { useState } from 'react';

const ChatPage: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleSendMessage = async () => {
    if (userInput.trim() === '') return;

    // Add user's message to chat history
    setChatHistory([...chatHistory, { role: 'user', content: userInput }]);
    setIsProcessing(true);

    // Simulate bot response (Replace this with actual API call)
    const botResponse = await getBotResponse(userInput);

    // Add bot's response to chat history
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { role: 'assistant', content: botResponse },
    ]);

    setUserInput(''); // Clear input
    setIsProcessing(false);
  };

  const getBotResponse = async (query: string): Promise<string> => {
    // Simulating a delay and returning a fake response
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Bot response for: "${query}"`);
      }, 1000);
    });
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold">Aider Assistant</h1>
      </header>

      <main className="flex-1 overflow-auto p-4">
        <div className="chat-container">
          {chatHistory.map((message, idx) => (
            <div key={idx} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
              <p className={`p-2 rounded-md ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
                {message.content}
              </p>
            </div>
          ))}
        </div>
      </main>

      <footer className="p-4 bg-gray-100">
        <div className="flex">
          <textarea
            className="flex-1 border rounded-md p-2"
            placeholder="Type your message..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            disabled={isProcessing}
          ></textarea>
          <button
            className="ml-2 bg-blue-500 text-white p-2 rounded-md"
            onClick={handleSendMessage}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Send'}
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ChatPage;
