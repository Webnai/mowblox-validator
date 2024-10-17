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
      className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex justify-center bg-cover bg-center items-center flex-col font-[family-name:var(--font-geist-sans)]`}
      style={{ backgroundImage: 'url("/error.jpg")' }}
    >
      <h1 className="text-2xl font-bold mb-4">OOps! Something Went Wrong!</h1>
      <p className="font-bold mb-4 w-[30%] text-center">You don't have or Mowblox account or don't have the <span className="text-[#CDFA6C]">Zkpass TransGate</span> extension installed</p>
      <button
        onClick={handleGoBack}
        className="border py-2 px-4 rounded-xl mb-20"
      >Go Back</button>
    </div>
  );
}
