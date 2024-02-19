import { getServerSession } from "next-auth";
import { Providers } from "./providers";
import { authOptions } from "./api/auth/[...nextauth]/config";
import { getWorkouts } from "./api/client";

export interface Workout {
  id: number;
  category: number;
  timezone: string;
  model: number;
  attrib: number;
  startdate: number;
  enddate: number;
  date: string;
  deviceid: any;
  data: Data;
  modified: number;
}

export interface Data {
  calories: number;
  intensity: number;
  manual_distance: number;
  manual_calories: number;
  steps: number;
  distance: number;
  date: string;
  timezone: string;
  deviceid: string;
  hash_deviceid: string;
  brand: number;
  is_tracker: boolean;
  elevation: number;
  soft: number;
  moderate: number;
  intense: number;
  active: number;
  totalcalories: number;
  hr_average: number;
  hr_min: number;
  hr_max: number;
  hr_zone_0: number;
  hr_zone_1: number;
  hr_zone_2: number;
  hr_zone_3: number;
}

export default async function Home() {
  const session = await getServerSession(authOptions);

  let lastWeekData: {
    body: {
      series: Workout[];
    };
  } = {
    body: {
      series: [],
    },
  };

  const start = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];
  const end = new Date().toISOString().split("T")[0];

  if (session) {
    lastWeekData = await getWorkouts(session?.user.accessToken, start, end);
  }

  return (
    <main className="flex flex-col w-full">
      Last week data ({start} - {end}):
      <div className="flex gap-2 flex-wrap">
        {lastWeekData.body.series.map((workout) => (
          <div
            className="flex flex-col w-[200px] h-[200px] p-2 bg-zinc-900"
            key={workout.id}
          >
            <p>date: {workout.date}</p>
            <p>cal: {Math.round(workout.data.calories)}</p>
            <p>steps: {Math.round(workout.data.steps)}</p>
          </div>
        ))}
      </div>
      <hr />
      <Providers />
    </main>
  );
}
