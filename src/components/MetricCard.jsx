const MetricCard = ({ title, value, unit, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4 transition-transform hover:scale-105">
    <div className={`p-3 rounded-lg bg-gray-50 ${color}`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</p>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        <span className="text-xs text-gray-400 font-semibold">{unit}</span>
      </div>
    </div>
  </div>
);

export default MetricCard;