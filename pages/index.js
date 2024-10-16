import Image from "next/image";
import localFont from "next/font/local";
import TransgateConnect from "@zkpass/transgate-js-sdk";
import { useRouter } from "next/router";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  const router = useRouter();

  // Updated verify function with navigation on success
  const verify = async () => {
    try {
      const appid = "10369363-9cbb-4c50-910a-d701c89ff3cf";
      const connector = new TransgateConnect(appid);
      const isAvailable = await connector.isTransgateAvailable();

      if (isAvailable) {
        const schemaId = "b800722b7dd2449e9d0b441ab45f5be6";
        const res = await connector.launch(schemaId);

        // Perform any on-chain or off-chain verification

        // If successful, redirect to the new page
        if (res) {
          router.push("/verify-success");
        }
      } else {
        console.log("Please install TransGate");
      }
    } catch (error) {
      router.push("/error");
      console.log("transgate error", error);
    }
  };

  // Updated generate function with navigation on success
  const generate = async () => {
    try {
      const appid = "10369363-9cbb-4c50-910a-d701c89ff3cf";
      const connector = new TransgateConnect(appid);
      const isAvailable = await connector.isTransgateAvailable();

      if (isAvailable) {
        const schemaId = "b800722b7dd2449e9d0b441ab45f5be6";
        const res = await connector.launch(schemaId);

        // Perform on-chain or off-chain proof generation

        // If successful, redirect to the new page
        if (res) {
          router.push("/generate-success");
        }
      } else {
        console.log("Please install TransGate");
      }
    } catch (error) {
      router.push("/error");
      console.log("transgate error", error);
    }
  };

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] overflow-hidden relative`}
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start text-center ">
        <h1 className="text-4xl font-bold ">Mowblox Account Validation</h1>
        <p className="text-lg">
          This app checks if you have a valid account with Mowblox.
        </p>
        <Image
          className="absolute lg:right-48 -z-10 sm:top-0 lg:-mt-80 "
          src="/astro2.jpg" 
          alt="astronaut logo"
          width={800}
          height={508}
          priority
        />
        <div className="flex gap-5 justify-center w-full">
          <button onClick={verify} className="border py-2 px-4 rounded-xl">Verify</button>
          <button onClick={generate} className="border py-2 px-4 rounded-xl" >Generate Proof</button>
        </div>
      </main>
    </div>
  );
}
