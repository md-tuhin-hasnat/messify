"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LogIn from "./login";
import Register from "./register";
import ResetPassword from "./reset-password";
import GoogleSignIn from "./google-signin";

export default function AuthPageComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="flex items-center justify-center h-navh w-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Authentication</CardTitle>
          <CardDescription>
            Login, register, or reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
              <TabsTrigger value="forgot-password">Reset</TabsTrigger>
            </TabsList>
            <LogIn
              // isLoading={isLoading}
              // setIsLoading={setIsLoading}
              setActiveTab={setActiveTab}
            />
            <Register
              // isLoading={isLoading}
              // setIsLoading={setIsLoading}
              setActiveTab={setActiveTab}
            />
            <ResetPassword
            // isLoading={isLoading} setIsLoading={setIsLoading}
            />
          </Tabs>
        </CardContent>
        <CardFooter>
          <GoogleSignIn />
        </CardFooter>
      </Card>
    </div>
  );
}
