import React, { useState, useMemo } from 'react';
import { ChartDataPoint } from '../types';
import { SALES_CHART_DATA, MONTH_CHART_DATA, YEAR_CHART_DATA, formatIDR } from '../data/mockData';

interface SalesChartProps {
  timeRange?: string;
}

export const SalesChart: React.FC<SalesChartProps> = () => {
  const [range, setRange] = useState<'7' | '30' | 'year'>('7');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const data: ChartDataPoint[] = useMemo(() => {
    if (range === '30') return MONTH_CHART_DATA;
    if (range === 'year') return YEAR_CHART_DATA;
    return SALES_CHART_DATA;
  }, [range]);

  const maxVal = useMemo(() => {
    const highest = Math.max(...data.map(d => d.sales));
    return range === 'year' ? 140000000 : 5000000;
  }, [data, range]);

  // SVG dimensions
  const width = 700;
  const height = 260;
  const paddingX = 45;
  const paddingY = 25;
  const graphWidth = width - paddingX * 2;
  const graphHeight = height - paddingY * 2;

  // Calculate coordinates
  const points = useMemo(() => {
    return data.map((d, index) => {
      const x = paddingX + (index / (data.length - 1)) * graphWidth;
      const y = height - paddingY - (d.sales / maxVal) * graphHeight;
      return { x, y, data: d, index };
    });
  }, [data, maxVal, graphWidth, graphHeight, height, paddingX, paddingY]);

  // Build SVG smooth path using cubic bezier curves
  const pathD = useMemo(() => {
    if (points.length === 0) return '';
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i === 0 ? 0 : i - 1];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return d;
  }, [points]);

  const areaD = useMemo(() => {
    if (points.length === 0) return '';
    const lastX = points[points.length - 1].x;
    const firstX = points[0].x;
    const bottomY = height - paddingY;
    return `${pathD} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  }, [pathD, points, height, paddingY]);

  // Y-axis grid ticks
  const ticks = range === 'year' 
    ? [0, 35000000, 70000000, 105000000, 140000000]
    : [0, 1000000, 2000000, 3000000, 4000000, 5000000];

  const formatTickLabel = (val: number) => {
    if (val === 0) return '0';
    if (val >= 1000000) return `${(val / 1000000).toFixed(0)}M`;
    if (val >= 1000) return `${(val / 1000).toFixed(0)}k`;
    return val.toString();
  };

  return (
    <div id="sales-trend-card" className="bg-white rounded-xl border border-[#EEEEEE] p-5 md:p-6 shadow-xs">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-base md:text-lg text-[#1b1c1c]">Tren Penjualan</h3>
        <select
          id="sales-chart-range-select"
          value={range}
          onChange={(e) => setRange(e.target.value as '7' | '30' | 'year')}
          aria-label="Pilih rentang waktu"
          className="bg-[#F5F3F3] border border-[#EEEEEE] rounded-lg text-xs md:text-sm font-medium text-[#4c4546] focus:ring-2 focus:ring-[#fec1d6] py-1.5 px-3 cursor-pointer outline-none"
        >
          <option value="7">7 Hari Terakhir</option>
          <option value="30">30 Hari Terakhir</option>
          <option value="year">Tahun Ini</option>
        </select>
      </div>

      <div className="w-full h-[260px] md:h-[290px] relative">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fec1d6" stopOpacity="0.65" />
              <stop offset="60%" stopColor="#fec1d6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#fec1d6" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal Grid lines and Y labels */}
          {ticks.map((tick) => {
            const yPos = height - paddingY - (tick / maxVal) * graphHeight;
            return (
              <g key={tick}>
                <line
                  x1={paddingX - 5}
                  y1={yPos}
                  x2={width - paddingX + 5}
                  y2={yPos}
                  stroke="#efeded"
                  strokeWidth="1"
                />
                <text
                  x={paddingX - 12}
                  y={yPos + 4}
                  textAnchor="end"
                  fill="#848484"
                  fontSize="11"
                  fontFamily="Inter"
                >
                  {formatTickLabel(tick)}
                </text>
              </g>
            );
          })}

          {/* Area Fill */}
          <path d={areaD} fill="url(#salesGradient)" />

          {/* Smooth Line */}
          <path
            d={pathD}
            fill="none"
            stroke="#805062"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Interactive Data Points */}
          {points.map((p) => {
            const isHovered = hoveredIndex === p.index;
            return (
              <g key={p.index}>
                {/* Invisible hover area */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="16"
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(p.index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
                {/* Visible dot */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isHovered ? '6' : '4.5'}
                  fill="#ffffff"
                  stroke="#805062"
                  strokeWidth="2.5"
                  className="transition-all duration-150 cursor-pointer pointer-events-none"
                />
              </g>
            );
          })}

          {/* X Axis Labels */}
          {points.map((p) => (
            <text
              key={`label-${p.index}`}
              x={p.x}
              y={height - 5}
              textAnchor="middle"
              fill="#848484"
              fontSize="11"
              fontFamily="Inter"
              fontWeight="500"
            >
              {p.data.day}
            </text>
          ))}
        </svg>

        {/* Floating Tooltip */}
        {hoveredIndex !== null && points[hoveredIndex] && (
          <div
            id="chart-tooltip"
            className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1b1b1b] text-white px-3 py-2 rounded-lg text-xs shadow-lg pointer-events-none z-20 flex flex-col items-center"
            style={{
              left: `${(points[hoveredIndex].x / width) * 100}%`,
              transform: 'translate(-50%, -100%)',
              marginTop: `${(points[hoveredIndex].y / height) * 260 - 10}px`
            }}
          >
            <span className="text-[11px] text-gray-300 font-medium">
              {points[hoveredIndex].data.fullDate || points[hoveredIndex].data.day}
            </span>
            <span className="text-sm font-bold text-[#fec1d6]">
              {formatIDR(points[hoveredIndex].data.sales)}
            </span>
            <span className="text-[10px] text-gray-400">
              {points[hoveredIndex].data.transactions} Transaksi
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
