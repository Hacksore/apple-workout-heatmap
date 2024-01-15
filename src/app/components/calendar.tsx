"use client";
import HeatMap from "@uiw/react-heat-map";

const value = [
  { date: "2023/01/11", count: 2 },
  { date: "2023/04/12", count: 20 },
  { date: "2023/12/13", count: 10 },
];

export default function Calendar() {
  return (
    <HeatMap
      lightingColor="red"
      value={value}
      style={{
        color: "#fff",
        // @ts-ignore
        "--rhm-rect": "#2d2d2d",
      }}
      weekLabels={["", "Mon", "", "Wed", "", "Fri", ""]}
      width="600"
      startDate={new Date("2023/01/01")}
      endDate={new Date("2023/12/31")}
    />
  );
}
