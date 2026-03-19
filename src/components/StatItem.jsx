const StatItem = ({ value, label, valueColor = "text-white" }) => {
  return (
    <div>
      <p className={`text-4xl font-black ${valueColor}`}>{value}</p>
      <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-2 font-bold">
        {label}
      </p>
    </div>
  );
};

export default StatItem;