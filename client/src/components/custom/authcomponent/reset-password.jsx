"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register: registerForgotPassword,
    handleSubmit: handleSubmitForgotPassword,
    formState: { errors: errorsForgotPassword },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const onSubmitForgotPassword = async (data) => {
    setIsLoading(true);
    //TODO Here i would typically send a password reset email
    console.log("Password reset requested for:", data.email);
    setTimeout(() => setIsLoading(false), 3000); // Simulating API call
  };
  return (
    <TabsContent value="forgot-password">
      <form onSubmit={handleSubmitForgotPassword(onSubmitForgotPassword)}>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="reset-email">Email</Label>
            <Input
              id="reset-email"
              placeholder="name@example.com"
              type="email"
              {...registerForgotPassword("email")}
            />
            {errorsForgotPassword.email && (
              <p className="text-sm text-red-500">
                {errorsForgotPassword.email.message}
              </p>
            )}
          </div>
        </div>
        <Button className="w-full mt-4" type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Reset Password
        </Button>
      </form>
    </TabsContent>
  );
}
