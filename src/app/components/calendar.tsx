"use client";
import HeatMap from "@uiw/react-heat-map";

export default function Calendar({ data }: { data: any }) {
  return (
    <>
      <HeatMap
        lightingColor="red"
        value={data}
        style={{
          color: "#fff",
          // @ts-ignore
          "--rhm-rect": "#2d2d2d",
        }}
        weekLabels={["", "Mon", "", "Wed", "", "Fri", ""]}
        width="800"
        startDate={new Date("2024/01/01")}
        endDate={new Date("2024/12/31")}
        panelColors={{
          [-1]: "red",
          0: "#2D2D2D",
          15: "#0e4429",
          30: "#006d32",
          45: "#26a641",
          60: "#39d353",
        }}
      />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}
