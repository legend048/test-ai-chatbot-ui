import { initChat } from './chat.js';
import { initUI } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize the UI components
  initUI();
  
  // Initialize the chat functionality
  initChat();
});