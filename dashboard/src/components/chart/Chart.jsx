import "./chart.css";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Chart({ title, data, dataKey, grid }) {
  return (
    <div className="chart">
      <p className="chartTitle" style={{ display: "flex" }}>
        {title}
        <DateRangeOutlinedIcon
          className="featuredIcon"
          style={{ color: "white" }}
        />
      </p>
      <ResponsiveContainer width="100%" aspect={8 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#f4f4f8" />
          <Line type="monotone" dataKey={dataKey} stroke="#08f0f9" />
          <Tooltip />
          {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
