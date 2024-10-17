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

export default function VerificationSuccess({ validatorAddress , handleGoBack }) { 

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex justify-center bg-cover bg-center text-center items-center flex-col font-[family-name:var(--font-geist-sans)]`}
      style={{ backgroundImage: 'url("/success.jpg")' }}
    >
      <h1 className="sm:text-lg lg:text-7xl font-bold">Verification Successful!</h1>
      <p className="items-center">
        Thank you for verifying your Mowblox account with{" "}
        <span className=" font-bold text-2xl text-[#CDFA6C]">Zkpass</span>
      </p>
      <p className="mt-4 mb-4">Validator Address: {validatorAddress}</p>
      <button
        onClick={handleGoBack}
        className="border py-2 px-4 rounded-xl"
      >
        Go Back
      </button>
    </div>
  );
}
