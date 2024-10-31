import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "./Accordion.css";

export default function Accordion({
  title,
  section,
  content,
  isActive,
  toggleSection,
}) {
  return (
    <div className="accordion">
      <p className="heading" onClick={() => toggleSection(section)}>
        <span>
          {isActive(section) ? (
            <FontAwesomeIcon
              icon={faChevronUp}
              style={{ marginRight: "10px" }}
            />
          ) : (
            <FontAwesomeIcon
              icon={faChevronDown}
              style={{ marginRight: "10px" }}
            />
          )}
        </span>
        {title}
      </p>
      {isActive(section) && (
        <div
          className={section}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </div>
  );
}
