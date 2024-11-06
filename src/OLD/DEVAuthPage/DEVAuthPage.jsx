import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import { useState } from "react";
import "./DEVAuthPage.css";

export default function DEVAuthPage({ setUser }) {
  const [login, setLogin] = useState(true);

  const features = [
    {
      title: "Help with Hebrew and Greek",
      description: "Access parsing information and word definitions through Parabible.",
      imgSrc: "/background.png", // Update with actual image path
      align: "left", // For alternating layout
    },
    {
      title: "Compare Translations",
      description: "View original text and modern translation side by side to catch every nuance.",
      imgSrc: "path/to/image2.png",
      align: "right",
    },
    {
      title: "Real-Time Feedback",
      description: "Receive detailed, language-specific feedback on word choice, grammar, and syntax.",
      imgSrc: "path/to/image3.png",
      align: "left",
    },
    {
      title: "Personalized Learning",
      description: "Track your progress and dive deeper into the areas that interest you most.",
      imgSrc: "path/to/image4.png",
      align: "right",
    },
  ];

  function handleToggle() {
    setLogin(!login);
  }

  return (
    <main className="auth-page">
      {/* <div className="sticky-login-button">
        <button onClick={handleToggle}>
          {login ? "Switch to Sign Up" : "Switch to Login"}
        </button>
      </div> */}
      
      <div className="title-section">
        <div className="brand">
        <h1>Advent Translation</h1>
        <p className="tagline">
          Unlock deeper biblical understanding with guided insights.
        </p>
        </div>
      <div className="auth-container">
        {login ? (
          <LoginForm setUser={setUser} handleToggle={handleToggle} />
        ) : (
          <SignUpForm setUser={setUser} handleToggle={handleToggle} />
        )}
        </div>
      </div>
      {features.map((feature, index) => (
        <section key={index} className={`feature-section ${feature.align}`}>
          
        
              <div className="text-content">
                <h2>{feature.title}</h2>
                <p>{feature.description}</p>
              </div>
              <img src={feature.imgSrc} alt={feature.title} />
       
          
        </section>
      ))}
      
    </main>
  );
}
