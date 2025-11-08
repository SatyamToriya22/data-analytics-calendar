import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { UserData } from '../store/calendarSlice';

interface DataChartProps {
  data: UserData[];
}

export const DataChart = ({ data }: DataChartProps) => {
  // Transform data for recharts
  const chartData = data.map((item) => {
    const [userName, value] = Object.entries(item)[0];
    return {
      name: userName.replace('_', ' ').toUpperCase(),
      value: value,
    };
  });

  return (
    <div className='data-chart'>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='value' fill='#3b82f6' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
