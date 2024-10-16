import localFont from "next/font/local";
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

export default function VerificationSuccess() {
  const router = useRouter(); // Ensure useRouter is used on the client side

  const handleGoBack = () => {
    router.push("/"); // Safe to use within an event handler
  };

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex lg:pt-80 bg-cover justify-center lg:justify-start bg-center items-center text-center flex-col font-[family-name:var(--font-geist-sans)]`}
      style={{ backgroundImage: 'url("/proof.jpg")' }}
    >
      <h1 className=" sm:text-[30px] lg:text-7xl font-bold">Proof Generated!</h1>
      <p className="items-center font-bold sm:text-[14px]">
        Thank you for generating your Mowblox account proof with{" "}
        <span className=" font-bold text-2xl text-[#CDFA6C]">Zkpass</span>
      </p>
      <div className="flex gap-5 justify-center w-full">
        <button onClick={handleGoBack} className="border py-2 px-4 rounded-xl">
          Go back
        </button>
      </div>
    </div>
  );
}
