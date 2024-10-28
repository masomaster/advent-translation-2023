import { useState } from "react";

export default function Accordion({ title, content }) {
  const [activeSections, setActiveSections] = useState([]);

  const toggleSection = (index) => {
    setActiveSections((prev) =>
      prev.includes(index)
        ? prev.filter((sectionIndex) => sectionIndex !== index)
        : [...prev, index]
    );
  };

  const isActive = (index) => activeSections.includes(index);

  return (
    <div className="accordion">
      <p className="heading" onClick={() => toggleSection(title)}>
        {title}
        <span>{isActive(title) ? " -" : " +"}</span>
      </p>
      {isActive(title) && (
        <div>
          <p>{content}</p>
        </div>
      )}
    </div>
  );
}
