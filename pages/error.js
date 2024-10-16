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
      <h1 className="text-2xl font-bold text-">OOps! Something Went Wrong!</h1>
      <button
        onClick={handleGoBack}
        className="border py-2 px-4 rounded-xl"
      >Go Back</button>
    </div>
  );
}
