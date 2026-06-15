import type { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  trend?: 'up' | 'down';
  trendValue?: string;
  color: 'blue' | 'green' | 'yellow' | 'red';
}

export function StatsCard({ title, value, icon, trend, trendValue, color }: StatsCardProps) {
  const colorStyles = {
    blue: {
      bg: 'bg-blue-50',
      icon: 'bg-blue-500',
      text: 'text-blue-600',
    },
    green: {
      bg: 'bg-green-50',
      icon: 'bg-green-500',
      text: 'text-green-600',
    },
    yellow: {
      bg: 'bg-yellow-50',
      icon: 'bg-yellow-500',
      text: 'text-yellow-600',
    },
    red: {
      bg: 'bg-red-50',
      icon: 'bg-red-500',
      text: 'text-red-600',
    },
  };

  const trendStyles = {
    up: 'text-green-500',
    down: 'text-red-500',
  };

  const currentColor = colorStyles[color];

  return (
    <div className={`bg-white rounded-xl p-5 border border-gray-200 hover:shadow-md transition-all duration-200 ${currentColor.bg}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && trendValue && (
            <p className={`text-xs font-medium mt-2 flex items-center gap-1 ${trendStyles[trend]}`}>
              {trend === 'up' ? '↑' : '↓'} {trendValue}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${currentColor.icon} text-white`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
