import "./Plans.css";
import { useEffect, useRef } from "react";
import photoBooth from "../assets/7.png";
import photoBooth2 from "../assets/8.png";
import photoBooth3 from "../assets/9.png";

import PlanCard from "./PlanCard";

const plans = [
  {
    id: "digital-hourly",
    imageSrc: photoBooth,
    imageAlt: "Photo booth package",
    price: "$85 hourly",
    title: "Package include:",
    features: [
      "Unlimited digital photo sessions. No prints.",
      "Custom-designed photo templates to match your event.",
      "Personalized photo with your event name, date, logo or custom message.",
      "Instant digital sharing, guests get their photos via text.",
      "A photo booth attendant to assist your guests.",
      "Fun props.",
      "Online photo album gallery for viewing and downloading.",
      "Full delivery and setup.",
    ],
  },
  {
    id: "print-hourly-1",
    imageSrc: photoBooth2,
    imageAlt: "Photo booth print package",
    price: "$125 hourly",
    title: "Package include:",
    features: [
      "Unlimited photo sessions and single prints 2x6 photo strips.",
      "Custom-designed photo templates to match your event.",
      "Personalized photo with your event name, date, logo or custom message.",
      "Instant digital sharing, guests get their photos via text.",
      "A photo booth attendant to assist your guests.",
      "Fun props.",
      "Online photo album gallery for viewing and downloading.",
      "Full delivery and setup.",
    ],
  },
  {
    id: "print-hourly-2",
    imageSrc: photoBooth3,
    imageAlt: "Photo booth print package",
    price: "$125 HOURLY",
    title: "Package include:",
    features: [
      "Unlimited photo sessions and single prints 2x6 photo strips.",
      "Custom-designed photo templates to match your event.",
      "Personalized photo with your event name, date, logo or custom message.",
      "Instant digital sharing, guests get their photos via text.",
      "A photo booth attendant to assist your guests.",
      "Fun props.",
      "Online photo album gallery for viewing and downloading.",
      "Full delivery and setup.",
    ],
  },
];

function Plans() {
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="plans-list">
      {plans.map((plan, index) => (
        <PlanCard
          key={plan.id}
          cardRef={(element) => (cardsRef.current[index] = element)}
          delay={index * 120}
          imageSrc={plan.imageSrc}
          imageAlt={plan.imageAlt}
          price={plan.price}
          title={plan.title}
          features={plan.features}
        />
      ))}
    </div>
  );
}

export default Plans;
