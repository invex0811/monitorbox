import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
const Graph = (props) => {
  return (
    <AreaChart width={props.width} height={props.height} data={props.data}>
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#16253B" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#16253B" stopOpacity={0} />
        </linearGradient>
      </defs>
      <CartesianGrid stroke="#ccc" strokeDasharray="1 1" />
      <XAxis dataKey={props.name} hide={props.hide} />
      <YAxis hide={props.hide} />
      <Tooltip
        contentStyle={{
          border: "none",
          borderRadius: "10px",
          backgroundColor: "#f0f0f0",
        }}
      />
      <Area
        type="monotone"
        dataKey={props.pv}
        stroke="#16253B"
        fillOpacity={1}
        fill="url(#colorUv)"
      />
    </AreaChart>
  );
};

export default Graph;
