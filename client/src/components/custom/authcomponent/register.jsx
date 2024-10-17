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
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import axios from "axios";

const authSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
});

export default function Register({ setActiveTab }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register: registerAuth,
    handleSubmit: handleSubmitAuth,
    formState: { errors: errorsAuth },
  } = useForm({
    resolver: zodResolver(authSchema),
  });

  const onSubmitAuth = async (data) => {
    setIsLoading(true);
    try {
      const { name, email, password } = data;
      const response = await axios.post(
        "http://localhost:3001/api/auth/register",
        { name, email, password },
        { withCredentials: true }
      );
      if (response.status === 201) {
        setIsLoading(false);
        router.push("/auth");
        setActiveTab("login");
      }
    } catch (error) {
      setIsLoading(false);
      var err;
      if (error?.response) {
        err = error.response.data.message;
      } else err = "Server Error";
      toast({
        variant: "destructive",
        title: "Oh no! something is not right",
        description: err,
      });
    }
  };

  return (
    <TabsContent value="register">
      <form onSubmit={handleSubmitAuth(onSubmitAuth)}>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Md Tuhin Hasnat"
              type="text"
              {...registerAuth("name")}
            />
            {errorsAuth.name && (
              <p className="text-sm text-red-500">{errorsAuth.name.message}</p>
            )}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              {...registerAuth("email")}
            />
            {errorsAuth.email && (
              <p className="text-sm text-red-500">{errorsAuth.email.message}</p>
            )}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="stR0ng-pasSw0rd@"
              {...registerAuth("password")}
            />
            {errorsAuth.password && (
              <p className="text-sm text-red-500">
                {errorsAuth.password.message}
              </p>
            )}
          </div>
        </div>
        <Button className="w-full mt-4" type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Register
        </Button>
      </form>
      <Button
        variant="link"
        className="w-full mt-2"
        onClick={() => setActiveTab("login")}
      >
        Already have an account?
      </Button>
    </TabsContent>
  );
}
