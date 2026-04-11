function PlanCard({
  cardRef,
  delay,
  imageSrc,
  imageAlt,
  price,
  title,
  features,
}) {
  return (
    <article
      ref={cardRef}
      className="plans-container"
      style={{ "--delay": `${delay}ms` }}
    >
      <div className="left-plan">
        <img src={imageSrc} alt={imageAlt} />
      </div>
      <div className="right-plan">
        <p className="plan-price">{price}</p>
        <h3>{title}</h3>
        <ul className="plan-list">
          {features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default PlanCard;
