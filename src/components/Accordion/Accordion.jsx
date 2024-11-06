import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "./Accordion.css";

export default function Accordion({
  title,
  section,
  content,
  isActive,
  toggleSection,
  infoButton,
}) {
  return (
    <div className="accordion">
      <p>
        <span className="heading" onClick={() => toggleSection(section)}>
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
          {title}
        </span>
        <span>{infoButton}</span>{" "}
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
