import { getServerSession } from "next-auth";
import { Providers } from "./providers";
import { authOptions } from "./api/auth/[...nextauth]/config";
import { getLastWeekData } from "./api/client";
export default async function Home() {
  const session = await getServerSession(authOptions);

  let lastWeekData = {};

  if (session) {
    lastWeekData = await getLastWeekData(session?.user.accessToken);
  }

  return (
    <main className="flex flex-col w-full">
      Server session:
      <pre>{JSON.stringify(session)}</pre>
      Last week data:
      <pre>{JSON.stringify(lastWeekData, null, 2)}</pre>
      <hr />
      Client session:
      <Providers />
    </main>
  );
}
