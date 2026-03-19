import { IconChart, IconClock, IconWhatsapp } from "../../assets/Icons";

const FeatureCard = ({ title, description, icon, colors }) => {
  return (
    <div className={`bg-gray-800/50 p-8 rounded-3xl border border-gray-700 transition-all group ${colors.hoverBorder}`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${colors.iconBg} ${colors.iconText}`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};


const FEATURES_DATA = [
  {
    id: 1,
    title: "Liquidación Real",
    description: "Calculamos automáticamente tu %. Diferencia entre efectivo y tarjeta para que sepas qué entregar al final del día.",
    icon: <IconClock />,
    colors: {
      hoverBorder: "hover:border-green-500/50",
      iconBg: "bg-green-500/20",
      iconText: "text-green-400",
    },
  },
  {
    id: 2,
    title: "Estadísticas Netas",
    description: "Visualiza tu rentabilidad real con gráficas de tus ingresos brutos frente a tu ganancia neta acumulada.",
    icon: <IconChart />,
    colors: {
      hoverBorder: "hover:border-blue-500/50",
      iconBg: "bg-blue-500/20",
      iconText: "text-blue-400",
    },
  },
  {
    id: 3,
    title: "Reportes Pro",
    description: "Envía resúmenes detallados a tu jefe o socio por WhatsApp. Liquidación de caja transparente en un solo toque.",
    icon: <IconWhatsapp />,
    colors: {
      hoverBorder: "hover:border-purple-500/50",
      iconBg: "bg-purple-500/20",
      iconText: "text-purple-400",
    },
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-12 px-6 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {FEATURES_DATA.map((feature) => (
        <FeatureCard
          key={feature.id}
          title={feature.title}
          description={feature.description}
          icon={feature.icon}
          colors={feature.colors}
        />
      ))}
    </section>
  );
};

export default FeaturesSection;