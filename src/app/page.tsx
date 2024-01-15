import Calendar from "./components/calendar";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { metricsTable } from "@/lib/db/schema";

export default async function Home() {
  const metrics = await db
    .select()
    .from(metricsTable)
    .where(eq(metricsTable.metricType, "apple_exercise_time"));

  const allMetrics = metrics.map((metric) => {
    // @ts-ignore
    return metric.data.reduce((acc, item) => {
      const date = new Date(item.date)
      const yearMonthDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;

      if (!acc[yearMonthDate]) {
        acc[yearMonthDate] = {
          count: 0,
        };
      } else {
        acc[yearMonthDate].count += item.qty;
      }
      return acc;
    }, {});
  });

  const resultArray = allMetrics.map((item) => ({
    date: Object.keys(item)[0],
    count: item[Object.keys(item)[0]].count
  }));

  return (
    <main className="flex flex-col w-full">
      <Calendar data={resultArray} />
    </main>
  );
}
