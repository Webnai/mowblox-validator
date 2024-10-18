import localFont from "next/font/local";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";

// Load local fonts
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

export default function VerificationSuccess({
  handleGoBack,
  res,
}) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex justify-center items-center flex-col text-center p-6 font-[family-name:var(--font-geist-sans)]`}
      style={{
        backgroundImage: 'url("/success.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
        Verification Successful!
      </h1>

      <p className="text-lg text-white mb-4">
        Thank you for verifying your Mowblox account with{" "}
        <span className="font-bold text-2xl text-[#CDFA6C]">Zkpass</span>
      </p>

      <div className="w-full max-w-4xl mb-6 bg-[#F250F5]/30 p-4 rounded-lg shadow-lg overflow-x-auto backdrop-blur-lg border border-[#ffffff40]">
        <h2 className="text-2xl font-semibold mb-4">Verification Response:</h2>
        <JSONPretty
          id="json-pretty"
          style={{ fontSize: "1.1em", textAlign: "start" }}
          data={res}
          mainStyle="padding:1em"
          valueStyle="font-size:1.5em"
        ></JSONPretty>
      </div>

      <button
        onClick={handleGoBack}
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-xl font-semibold transition duration-300 ease-in-out"
      >
        Go Back
      </button>
    </div>
  );
}
