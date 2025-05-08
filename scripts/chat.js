import { generateResponse } from './mockApi.js';

let chatHistory = [];
let currentChatId = null;

export function initChat() {
  const chatForm = document.getElementById('chatForm');
  const userInput = document.getElementById('userInput');
  const messagesContainer = document.getElementById('messagesContainer');
  const welcomeScreen = document.getElementById('welcomeScreen');
  const clearChatBtn = document.getElementById('clearChatBtn');
  const exampleBtns = document.querySelectorAll('.example-btn');
  
  // Load chat history from localStorage
  loadChatHistory();
  
  // Set up event listeners
  chatForm.addEventListener('submit', handleChatSubmit);
  clearChatBtn.addEventListener('click', clearChat);
  
  // Example buttons
  exampleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const promptText = btn.getAttribute('data-prompt');
      userInput.value = promptText;
      userInput.focus();
    });
  });
  
  // Auto-resize textarea
  userInput.addEventListener('input', () => {
    userInput.style.height = 'auto';
    userInput.style.height = Math.min(userInput.scrollHeight, 200) + 'px';
  });
  
  // Enable/disable send button based on input
  userInput.addEventListener('input', () => {
    const sendBtn = document.getElementById('sendBtn');
    sendBtn.disabled = userInput.value.trim() === '';
  });
  
  /**
   * Handle chat form submission
   */
  function handleChatSubmit(e) {
    e.preventDefault();
    const message = userInput.value.trim();
    
    if (!message) return;
    
    // Create new chat if needed
    if (!currentChatId) {
      createNewChat(message);
    }
    
    // Add user message to UI
    addMessage('user', message);
    
    // Clear input and reset height
    userInput.value = '';
    userInput.style.height = 'auto';
    userInput.focus();
    
    // Hide welcome screen if visible
    if (!welcomeScreen.classList.contains('hidden')) {
      welcomeScreen.classList.add('hidden');
    }
    
    // Show typing indicator
    showTypingIndicator();
    
    // Generate AI response
    setTimeout(() => {
      generateAIResponse(message);
    }, 500);
  }
  
  /**
   * Generate AI response
   */
  async function generateAIResponse(userMessage) {
    try {
      const aiResponse = await generateResponse(userMessage);
      
      // Remove typing indicator
      removeTypingIndicator();
      
      // Add AI message to UI
      addMessage('ai', aiResponse);
      
      // Update chat in history
      updateChatInHistory();
    } catch (error) {
      console.error('Error generating response:', error);
      removeTypingIndicator();
      addMessage('ai', 'Sorry, I encountered an error. Please try again.');
    }
  }
  
  /**
   * Add a message to the chat UI
   */
  function addMessage(sender, content) {
    // Hide welcome screen if visible
    welcomeScreen.classList.add('hidden');
    
    const messageEl = document.createElement('div');
    messageEl.className = `message ${sender}`;
    
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const senderName = sender === 'user' ? 'You' : 'AI Assistant';
    const senderIcon = sender === 'user' ? '👤' : '🤖';
    
    messageEl.innerHTML = `
      <div class="message-content">
        <div class="message-header">
          <div class="message-avatar">${senderIcon}</div>
          <div class="message-sender">${senderName}</div>
          <div class="message-time">${timeString}</div>
        </div>
        <div class="message-text">${formatMessageContent(content)}</div>
      </div>
    `;
    
    messagesContainer.appendChild(messageEl);
    
    // Scroll to bottom
    scrollToBottom();
    
    // Add message to current chat
    if (currentChatId) {
      const chatIndex = chatHistory.findIndex(chat => chat.id === currentChatId);
      if (chatIndex !== -1) {
        chatHistory[chatIndex].messages.push({
          sender,
          content,
          timestamp: now.toISOString()
        });
        // Save to localStorage
        saveChatsToLocalStorage();
      }
    }
  }
  
  /**
   * Format message content (handle code blocks, links, etc.)
   */
  function formatMessageContent(content) {
    // This is a simple formatter - you can enhance this to handle markdown, code blocks, etc.
    return content
      .replace(/\n/g, '<br>')
      .replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>');
  }
  
  /**
   * Show typing indicator
   */
  function showTypingIndicator() {
    const typingEl = document.createElement('div');
    typingEl.className = 'typing-indicator';
    typingEl.id = 'typingIndicator';
    typingEl.innerHTML = `
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    `;
    messagesContainer.appendChild(typingEl);
    scrollToBottom();
  }
  
  /**
   * Remove typing indicator
   */
  function removeTypingIndicator() {
    const typingEl = document.getElementById('typingIndicator');
    if (typingEl) {
      typingEl.remove();
    }
  }
  
  /**
   * Scroll chat container to bottom
   */
  function scrollToBottom() {
    const chatContainer = document.getElementById('chatContainer');
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
  
  /**
   * Create a new chat
   */
  function createNewChat(title) {
    currentChatId = generateId();
    const chatTitle = title.length > 30 ? title.substring(0, 30) + '...' : title;
    
    chatHistory.push({
      id: currentChatId,
      title: chatTitle,
      created: new Date().toISOString(),
      messages: []
    });
    
    updateChatHistoryUI();
    saveChatsToLocalStorage();
  }
  
  /**
   * Load chat history from localStorage
   */
  function loadChatHistory() {
    const savedChats = localStorage.getItem('ai_chat_history');
    if (savedChats) {
      chatHistory = JSON.parse(savedChats);
      updateChatHistoryUI();
    }
  }
  
  /**
   * Save chats to localStorage
   */
  function saveChatsToLocalStorage() {
    localStorage.setItem('ai_chat_history', JSON.stringify(chatHistory));
  }
  
  /**
   * Update chat history UI
   */
  function updateChatHistoryUI() {
    const chatHistoryEl = document.getElementById('chatHistory');
    chatHistoryEl.innerHTML = '';
    
    chatHistory.forEach(chat => {
      const chatItemEl = document.createElement('div');
      chatItemEl.className = `chat-item ${chat.id === currentChatId ? 'active' : ''}`;
      chatItemEl.setAttribute('data-id', chat.id);
      chatItemEl.innerHTML = `
        <span class="chat-icon">💬</span>
        <span class="chat-title">${chat.title}</span>
      `;
      
      chatItemEl.addEventListener('click', () => {
        loadChat(chat.id);
      });
      
      chatHistoryEl.appendChild(chatItemEl);
    });
  }
  
  /**
   * Load a specific chat
   */
  function loadChat(chatId) {
    const chat = chatHistory.find(c => c.id === chatId);
    if (!chat) return;
    
    currentChatId = chatId;
    updateChatHistoryUI();
    
    // Clear current messages
    messagesContainer.innerHTML = '';
    welcomeScreen.classList.add('hidden');
    
    // Add all messages from the chat
    chat.messages.forEach(msg => {
      addMessage(msg.sender, msg.content);
    });
  }
  
  /**
   * Update the current chat in history
   */
  function updateChatInHistory() {
    updateChatHistoryUI();
    saveChatsToLocalStorage();
  }
  
  /**
   * Clear current chat
   */
  function clearChat() {
    if (currentChatId) {
      const chatIndex = chatHistory.findIndex(chat => chat.id === currentChatId);
      if (chatIndex !== -1) {
        chatHistory[chatIndex].messages = [];
        saveChatsToLocalStorage();
      }
    }
    
    messagesContainer.innerHTML = '';
    welcomeScreen.classList.remove('hidden');
  }
  
  /**
   * Generate a unique ID
   */
  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
}

/**
 * Create a new chat and reset UI
 */
export function startNewChat() {
  currentChatId = null;
  document.getElementById('messagesContainer').innerHTML = '';
  document.getElementById('welcomeScreen').classList.remove('hidden');
  document.getElementById('userInput').value = '';
  document.getElementById('userInput').style.height = 'auto';
  document.getElementById('userInput').focus();
}