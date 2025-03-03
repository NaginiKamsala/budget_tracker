import React from "react";

function TopExpensesChart({ chartData }) {
  return chartData.map((i, j) => (
    <div key={j}>
      <p>{i.name}</p>
      <div>
        <div
          className="topExpensesChartDiv"
          style={{
            width: `${
              (i.value /
                Math.max(
                  chartData[0].value,
                  chartData[1].value,
                  chartData[2].value
                )) *
                100 >
              0
                ? (i.value /
                    Math.max(
                      chartData[0].value,
                      chartData[1].value,
                      chartData[2].value
                    )) *
                  100
                : 0
            }%`,
          }}
        >
          .
        </div>
      </div>
    </div>
  ));
}

export default TopExpensesChart;
