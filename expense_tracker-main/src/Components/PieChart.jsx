import React, { useEffect } from "react";
import { Cell, Pie, PieChart } from "recharts";

function PieChartComponent({ state }) {
  const COLORS = ["#A000FF", "#FF9304", "#FDE006"];
  const data = [
    {
      name: "Food",
      value: state.food.length
        ? state.food.reduce((acc, i) => (acc += +i.price), 0)
        : 0,
    },
    {
      name: "Entertainment",
      value: state.entertainment.length
        ? state.entertainment.reduce((acc, i) => (acc += +i.price), 0)
        : 0,
    },
    {
      name: "Travel",
      value: state.travel.length
        ? state.travel.reduce((acc, i) => (acc += +i.price), 0)
        : 0,
    },
  ];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {(percent * 100).toFixed(0) > 0 && `${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return data[0].value || data[1].value || data[2].value ? (
    <PieChart width={170} height={180}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell
            style={{ outline: "none", border: "none" }}
            key={`cell-${index}`}
            fill={COLORS[index]}
          />
        ))}
      </Pie>
    </PieChart>
  ) : (
    <div style={{ height: "180px", display: "flex", alignItems: "center" }}>
      <p>Add expense to plot pie chart</p>
    </div>
  );
}

export default PieChartComponent;
