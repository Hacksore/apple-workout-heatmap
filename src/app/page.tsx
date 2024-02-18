import { Providers } from "./providers";
export default async function Home() {

  return (
    <main className="flex flex-col w-full">
      This is a oauth demo flow

      <Providers/>
    </main>
  );
}
