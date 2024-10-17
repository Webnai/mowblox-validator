import Image from "next/image";
import localFont from "next/font/local";
import TransgateConnect from "@zkpass/transgate-js-sdk";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Web3 from "web3";
import VerificationSuccess from './verify-success'; 

// Local fonts
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
  const [loading, setLoading] = useState(false);
  const [web3, setWeb3] = useState(null);
  const [verificationSuccess, setVerificationSuccess] = useState(false); 
  const [validatorAddress, setValidatorAddress] = useState(null); // Change to validatorAddress

  const EVMTaskAllocator = "0x19a567b3b212a5b35bA0E3B600FbEd5c2eE9083d";

  // Initialize Web3 instance on component mount
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
    } else {
      console.error("Please install MetaMask!");
      router.push("/error?message=Please install MetaMask!");
    }
  }, [router]);

  // Generate function for off-chain verification
  const generate = async () => {
    setLoading(true);
    try {
      const appid = "10369363-9cbb-4c50-910a-d701c89ff3cf";
      const connector = new TransgateConnect(appid);
      const isAvailable = await connector.isTransgateAvailable();

      if (isAvailable) {
        const schemaId = "b800722b7dd2449e9d0b441ab45f5be6";
        const res = await connector.launch(schemaId);

        // Perform off-chain verification
        if (res) {
          const isValid = await verifyOffChainResult(res, schemaId);
          if (isValid) {
            console.log("Off-chain verification successful");
          } else {
            throw new Error("Off-chain verification failed");
          }
        }
      } else {
        console.log("Please install TransGate");
      }
    } catch (error) {
      console.error("Verification error: ", error);
      router.push({
        pathname: "/error",
        query: { message: "Verification failed: " + error.message },
      });
    } finally {
      setLoading(false);
    }
  };

  // Function to verify signatures off-chain
  const verifyOffChainResult = async (res, schemaId) => {
    try {
      const {
        taskId,
        uHash,
        publicFieldsHash,
        validatorAddress: vAddress, // Destructure the validatorAddress
        allocatorSignature,
        validatorSignature,
      } = res;

      const taskIdHex = web3.utils.stringToHex(taskId);
      const schemaIdHex = web3.utils.stringToHex(schemaId);

      // Allocator signature verification
      const allocatorParams = web3.eth.abi.encodeParameters(
        ["bytes32", "bytes32", "address"],
        [taskIdHex, schemaIdHex, vAddress] // Use vAddress for verification
      );
      console.log(allocatorParams);

      const allocatorParamsHash = web3.utils.soliditySha3(allocatorParams);
      const signedAllocatorAddress = web3.eth.accounts.recover(
        allocatorParamsHash,
        allocatorSignature
      );

      console.log(signedAllocatorAddress);
      const isAllocatorValid = signedAllocatorAddress === EVMTaskAllocator;
      console.log(`Allocator Signature Valid: ${isAllocatorValid}`);

      // Validator signature verification
      const validatorParams = web3.eth.abi.encodeParameters(
        ["bytes32", "bytes32", "bytes32", "bytes32"],
        [taskIdHex, schemaIdHex, uHash, publicFieldsHash]
      );
      console.log(validatorParams);
      const validatorParamsHash = web3.utils.soliditySha3(validatorParams);
      const signedValidatorAddress = web3.eth.accounts.recover(
        validatorParamsHash,
        validatorSignature
      );
      const isValidatorValid = signedValidatorAddress === vAddress; 
      console.log(`Validator Signature Valid: ${isValidatorValid}`);

      // Set the validator address and verification success state
      if (isAllocatorValid && isValidatorValid) {
        setValidatorAddress(vAddress);
        setVerificationSuccess(true); 
      }
      return isAllocatorValid && isValidatorValid;
    } catch (error) {
      console.error("Off-chain verification failed", error);
      return false;
    }
  };

  const handleGoBack = () => {
    setVerificationSuccess(false);
    setValidatorAddress(null);
  };

  if (verificationSuccess) {
    return <VerificationSuccess validatorAddress={validatorAddress} handleGoBack={handleGoBack} />;
  }

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] overflow-hidden relative`}
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start text-center">
        <h1 className="text-4xl font-bold">Mowblox Account Validation</h1>
        <p className="text-lg">
          This app checks if you have a valid account with Mowblox.
        </p>
        <Image
          className="absolute lg:right-48 -z-10 sm:top-0"
          src="/astro2.jpg"
          alt="astronaut logo"
          width={800}
          height={508}
          priority
        />
        <div className="flex gap-5 justify-center w-full">
          <button
            onClick={generate}
            className="border py-2 px-4 rounded-xl"
            disabled={loading || !web3}
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </div>
      </main>
    </div>
  );
}
