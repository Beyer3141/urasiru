import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add custom styles
const style = document.createElement('style');
style.textContent = `
  body {
    background-color: #F6F6F6;
    background-image: 
      radial-gradient(circle at 10% 20%, rgba(93, 63, 211, 0.05) 0%, rgba(93, 63, 211, 0) 20%),
      radial-gradient(circle at 90% 80%, rgba(32, 178, 170, 0.07) 0%, rgba(32, 178, 170, 0) 20%);
    background-attachment: fixed;
  }
  
  .font-heading {
    font-family: 'Playfair Display', serif;
  }
  
  .font-body {
    font-family: 'Noto Sans JP', sans-serif;
  }
  
  .font-accent {
    font-family: 'Cinzel', serif;
  }
  
  .animate-fade-in {
    animation: fadeIn 0.5s ease forwards;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

createRoot(document.getElementById("root")!).render(<App />);
