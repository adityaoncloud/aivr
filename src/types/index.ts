export interface User {
    id: number;
    username: string;
    email: string;
  }
  
  export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
    timestamp?: string;
  }
  
  export interface AgentThought {
    agent: string;
    thoughts: string;
    timestamp: string;
  }
  
  export interface ChatResponse {
    content: string;
    agent_thoughts?: AgentThought[];
  }