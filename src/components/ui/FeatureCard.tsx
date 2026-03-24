import React, { ReactNode } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ComponentType;
  colors: {
    hoverBorder: string;
    iconBg: string;
    iconText: string;
  };
}

const FeatureCard = ({
  title,
  description,
  icon: Icon,
  colors,
}: FeatureCardProps) => {
  return (
    <div
      className={`bg-gray-800/50 p-8 rounded-3xl border border-gray-700 transition-all group ${colors.hoverBorder}`}
    >
      {Icon && (
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${colors.iconBg} ${colors.iconText}`}
        >
          <Icon />
        </div>
      )}
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
};
export default FeatureCard;
