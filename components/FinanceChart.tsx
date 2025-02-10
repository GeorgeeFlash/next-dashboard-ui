"use client";

import Image from "next/image";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    income: 4000,
    expense: 2400,
  },
  {
    name: "Feb",
    income: 3000,
    expense: 1398,
  },
  {
    name: "March",
    income: 2000,
    expense: 9800,
  },
  {
    name: "April",
    income: 2780,
    expense: 3908,
  },
  {
    name: "May",
    income: 1890,
    expense: 4800,
  },
  {
    name: "June",
    income: 2390,
    expense: 3400,
  },
  {
    name: "July",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Aug",
    income: 4000,
    expense: 3400,
  },
  {
    name: "Sep",
    income: 3800,
    expense: 2980,
  },
  {
    name: "Oct",
    income: 4190,
    expense: 3540,
  },
  {
    name: "Nov",
    income: 3500,
    expense: 3000,
  },
  {
    name: "Dec",
    income: 4500,
    expense: 2900,
  },
];

const FinanceChart = () => {
  return (
    <div className="bg-white rounded-lg p-4 h-full">
      <div className="flex justify-between items-center">
        <h1 className=" text-lg font-semibold">Finance</h1>
        <Image src={"/moreDark.png"} alt="" width={20} height={20} />
      </div>
      <ResponsiveContainer width={"100%"} height={"90%"}>
        <LineChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="ddd" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
            tickMargin={10}
          />
          <YAxis
            axisLine={false}
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
            tickMargin={20}
          />

          <Tooltip
            contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }}
          />
          <Legend
            align="center"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }}
          />
          <Line
            dataKey={"income"}
            fill="#FAE27C"
            legendType="circle"
            type={"monotone"}
            stroke="#FAE27C"
            strokeWidth={5}
          />
          <Line
            dataKey={"expense"}
            fill="#C3EBFA"
            legendType="circle"
            type={"monotone"}
            stroke="#C3EBFA"
            strokeWidth={5}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinanceChart;
