/**
 * Mock API to generate AI responses
 * This simulates an AI service like GPT
 */

const responseTemplates = [
  "I understand you're asking about {topic}. This is an interesting subject that involves several aspects...",
  "Thanks for your question about {topic}. Here are some thoughts on this matter...",
  "When it comes to {topic}, there are multiple perspectives to consider...",
  "Your question about {topic} is quite thought-provoking. Let me share some insights...",
  "Regarding {topic}, the current understanding suggests that...",
  "I'd be happy to discuss {topic} with you. This is an area with several important considerations..."
];

const topics = [
  "artificial intelligence",
  "machine learning",
  "web development",
  "programming languages",
  "data science",
  "quantum computing",
  "software engineering",
  "user experience design",
  "cybersecurity",
  "blockchain technology",
  "cloud computing",
  "mobile app development",
  "internet of things",
  "augmented reality",
  "virtual reality",
  "robotics",
  "natural language processing",
  "computer vision",
  "responsive design",
  "accessibility"
];

const factoids = [
  "Did you know that the first computer programmer was Ada Lovelace, who wrote the first algorithm for Charles Babbage's Analytical Engine in the 1840s?",
  "JavaScript was created in just 10 days by Brendan Eich in 1995.",
  "The term 'bug' in computing originated when Grace Hopper found a moth in the Harvard Mark II computer in 1947.",
  "Python was named after Monty Python, not the snake.",
  "The first website ever created is still online: http://info.cern.ch/",
  "There are approximately 700 programming languages in use today.",
  "The first computer mouse was made of wood and invented by Douglas Engelbart in 1964.",
  "About 90% of the world's currency is digital and exists only on computers.",
  "The world's first hard drive from 1956 could store 5MB and weighed over a ton.",
  "The average smartphone today has more computing power than all of NASA when they sent a man to the moon in 1969."
];

/**
 * Generate a pseudo-random response based on the input
 * @param {string} userMessage - The message from the user
 * @returns {Promise<string>} - A promise that resolves to the AI response
 */
export function generateResponse(userMessage) {
  return new Promise((resolve) => {
    // Simulate network delay (500-2500ms)
    const delay = Math.floor(Math.random() * 2000) + 500;
    
    setTimeout(() => {
      // Extract potential topics from user message
      const messageLower = userMessage.toLowerCase();
      const relevantTopics = topics.filter(topic => messageLower.includes(topic));
      
      // Select a topic (either from the user message or random)
      const selectedTopic = relevantTopics.length > 0 
        ? relevantTopics[Math.floor(Math.random() * relevantTopics.length)]
        : topics[Math.floor(Math.random() * topics.length)];
      
      // Select a response template
      const templateIndex = Math.floor(Math.random() * responseTemplates.length);
      let response = responseTemplates[templateIndex].replace('{topic}', selectedTopic);
      
      // Generate more content based on message length
      const paragraphs = Math.floor(Math.random() * 3) + 1;
      
      // Add content paragraphs
      for (let i = 0; i < paragraphs; i++) {
        response += '\n\n';
        
        // Generate a paragraph of 3-6 sentences
        const sentences = Math.floor(Math.random() * 4) + 3;
        for (let j = 0; j < sentences; j++) {
          response += generateSentence(selectedTopic) + ' ';
        }
      }
      
      // Maybe add a factoid at a 30% chance
      if (Math.random() < 0.3) {
        const factoidIndex = Math.floor(Math.random() * factoids.length);
        response += '\n\n' + factoids[factoidIndex];
      }
      
      // If asking for code, generate a code example
      if (messageLower.includes('code') || 
          messageLower.includes('example') || 
          messageLower.includes('function') ||
          messageLower.includes('program')) {
        response += '\n\n```javascript\n' + generateCodeExample() + '\n```\n\n';
        response += "Feel free to adapt this code to your specific needs. Let me know if you need any clarification or have additional questions!";
      }
      
      // Conditionally add a conclusion
      if (Math.random() < 0.7) {
        response += '\n\nIs there anything specific about this topic you\'d like me to explore further?';
      }
      
      resolve(response);
    }, delay);
  });
}

/**
 * Generate a random sentence about a topic
 */
function generateSentence(topic) {
  const structures = [
    `${topic} has been evolving rapidly in recent years.`,
    `Many experts consider ${topic} to be a revolutionary field.`,
    `The principles of ${topic} can be applied to solve various problems.`,
    `Understanding ${topic} requires knowledge of several related concepts.`,
    `Recent advancements in ${topic} have opened new possibilities.`,
    `The future of ${topic} looks promising with ongoing research.`,
    `Companies are investing heavily in ${topic} technologies.`,
    `Learning about ${topic} can enhance your professional skills.`,
    `The history of ${topic} dates back several decades.`,
    `Practical applications of ${topic} can be found in many industries.`
  ];
  
  return structures[Math.floor(Math.random() * structures.length)];
}

/**
 * Generate a simple code example
 */
function generateCodeExample() {
  const examples = [
    `function calculateAverage(numbers) {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((total, num) => total + num, 0);
  return sum / numbers.length;
}

// Example usage
const values = [12, 34, 56, 78, 90];
console.log(calculateAverage(values)); // 54`,

    `// A simple async function to fetch data
async function fetchUserData(userId) {
  try {
    const response = await fetch(\`https://api.example.com/users/\${userId}\`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}`,

    `// Class for a basic task manager
class TaskManager {
  constructor() {
    this.tasks = [];
  }
  
  addTask(title, priority = 'medium') {
    const newTask = {
      id: Date.now(),
      title,
      priority,
      completed: false,
      createdAt: new Date()
    };
    this.tasks.push(newTask);
    return newTask;
  }
  
  completeTask(taskId) {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = true;
      return true;
    }
    return false;
  }
  
  getTasks(filterCompleted = false) {
    return filterCompleted 
      ? this.tasks.filter(t => !t.completed)
      : this.tasks;
  }
}`,

    `// Event listener pattern
document.getElementById('myButton').addEventListener('click', function() {
  console.log('Button clicked!');
  
  // Change the button text
  this.textContent = 'Clicked!';
  
  // Disable the button
  this.disabled = true;
  
  // Enable after 3 seconds
  setTimeout(() => {
    this.textContent = 'Click me';
    this.disabled = false;
  }, 3000);
});`
  ];
  
  return examples[Math.floor(Math.random() * examples.length)];
}