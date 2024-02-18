import { getServerSession } from "next-auth";
import { Providers } from "./providers";
import { authOptions } from "./api/auth/[...nextauth]/config";
export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <main className="flex flex-col w-full">
      Server session:
      <pre>{JSON.stringify(session)}</pre>
      <hr />
      Client session:
      <Providers/>
    </main>
  );
}
