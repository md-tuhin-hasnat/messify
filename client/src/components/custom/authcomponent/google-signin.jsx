"use client";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa6";
export default function GoogleSignIn() {
  const handleGoogleSignIn = async () => {
    window.location.href = "http://localhost:3001/api/auth/google";
  };

  return (
    <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
      <FaGoogle className="mr-2 h-4 w-4" />
      Sign in with Google
    </Button>
  );
}
