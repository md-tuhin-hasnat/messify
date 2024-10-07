"use client";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa6";
export default function GoogleSignIn() {
  const handleGoogleSignIn = () => {
    //TODO Implement Google Sign-In logic here
    console.log("Google Sign-In clicked");
  };

  return (
    <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
      <FaGoogle className="mr-2 h-4 w-4" />
      Sign in with Google
    </Button>
  );
}
