"use client";

import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import getMessByCode from "@/app/actions/get_mess_by_code.action";
import postJoinRequest from "@/app/actions/post_join_req.action";
export default function JoinMessDialogComponent() {
  const [open, setOpen] = useState(false);
  const [messCode, setMessCode] = useState("");
  const [messName, setMessName] = useState("");
  const [messError, setMessError] = useState("");
  const router = useRouter();

  const sanitizeInput = (input) => {
    return input.replace(/[^0-9a-z]/g, "");
  };

  const postData = async (messCode) => {
    try {
      const response = await postJoinRequest({ messCode });
      if (response.status !== 201) {
        toast({
          variant: "destructive",
          title: "Something is not Right 1",
          description: "Join Request Failed",
        });
      } else {
        toast({
          title: "Done !",
          description: "Join Request Sent",
        });
      }
    } catch (error) {
      var err;
      if (error?.response) {
        err = error.response.data.message;
      } else err = "Server Error";
      toast({
        variant: "destructive",
        title: "Oh no! Join Request failed",
        description: error.toString(),
      });
    }
  };

  const getData = async () => {
    try {
    } catch (error) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sanitizedMessCode = sanitizeInput(messCode.trim());
    if (sanitizedMessCode.length !== 6) {
      toast({
        variant: "destructive",
        title: "Invalid Mess Code",
        description: "Please enter a 6-digit mess code.",
      });
      return;
    }

    await postData(sanitizedMessCode);
    await getData();
    router.push("/");

    setOpen(false);
    setMessCode("");
  };
  useEffect(() => {
    async function getMess() {
      const inputCode = sanitizeInput(messCode.trim());
      if (inputCode.length === 6) {
        const response = await getMessByCode({ mess_code: inputCode });
        // console.log(response);
        if (response.success) {
          setMessError("");
          setMessName(`Mess Name : ${response.messname}`);
        } else {
          setMessName("");
          setMessError(response.message);
        }
      } else {
        setMessName("");
        setMessError("");
      }
    }
    getMess();
  }, [messCode]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start rounded-none px-4 py-2 text-sm font-normal"
        >
          Join Mess
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[350px]">
        <DialogHeader>
          <DialogTitle>Join a Mess</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="messCode">Mess Code</Label>
            <Input
              id="messCode"
              value={messCode}
              onChange={(e) => setMessCode(e.target.value)}
              required
              maxLength={6}
              pattern="^[0-9a-z]{6}$"
              title="Please enter a 6-digit code"
              placeholder="Enter 6-digit mess code"
            />
          </div>
          {messName !== "" && <span className="text-sm">{messName}</span>}
          {messError !== "" && (
            <span className="text-sm text-red-600">{messError}</span>
          )}

          <Button type="submit" className="mt-4">
            Request to Join
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
