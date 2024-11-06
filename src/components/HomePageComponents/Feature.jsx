export default function Feature({ title, icon, description }) {
  return (
    <div className="feature-item">
        {icon}
      <h2 className="feature-title">{title}</h2>
      <p className="feature-description">{description}</p>
    </div>
  );
}