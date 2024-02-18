import { getServerSession } from "next-auth";
import { Providers } from "./providers";
import { authOptions } from "./api/auth/[...nextauth]/config";
import { getLastWeekData } from "./api/client";
export default async function Home() {
  const session = await getServerSession(authOptions);

  let lastWeekData = {};


  const start = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
  const end = new Date().toISOString().split("T")[0];

  if (session) {
    lastWeekData = await getLastWeekData(session?.user.accessToken, start, end);
  }

  return (
    <main className="flex flex-col w-full">
      Server session:
      <pre>{JSON.stringify(session)}</pre>
      Last week data ({start} - {end}):
      <pre>{JSON.stringify(lastWeekData, null, 2)}</pre>
      <hr />
      Client session:
      <Providers />
    </main>
  );
}
