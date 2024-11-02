"use client";

import { useContext, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useRouter } from "next/navigation";
import { backendURL } from "@/lib/secret";
import { toast } from "@/hooks/use-toast";
import { AllMessContext } from "@/app/providers";
import getMesses from "@/app/actions/get_messes.action";

export default function MessRegistrationDialogComponent() {
  const [open, setOpen] = useState(false);
  const [messName, setMessName] = useState("");
  const [memberCount, setMemberCount] = useState("");
  const { setMessList } = useContext(AllMessContext);
  const router = useRouter();
  const sanitizeInput = (input) => {
    return input.replace(/[&<>"']/g, (match) => {
      const escapeChars = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
      };
      return escapeChars[match];
    });
  };

  const postData = async ({ messName, memberCount }) => {
    try {
      const response = await axios.post(
        `${backendURL}/api/mess/create`,
        { name: messName, messType: memberCount },
        { withCredentials: true }
      );
      if (response.status === 201) {
        toast({
          title: "Mess Created Successfully",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Oh No! Something is not right",
          description: response.statusText,
        });
      }
    } catch (error) {
      var err;
      if (error?.response) {
        err = error.response.data.message;
      } else err = "Server Error";
      toast({
        variant: "destructive",
        title: "Oh no! Login was not Successful",
        description: err,
      });
    }
  };
  const getData = async () => {
    getMesses()
      .then((messes) => {
        setMessList([]);
        messes.allMessOfUser.map((mess) => {
          const newMess = {
            label: mess.name,
            value: mess.code,
          };
          setMessList((prev) => {
            return [...prev, newMess];
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sanitize inputs before processing
    const sanitizedMessName = sanitizeInput(messName.trim());

    // Validate memberCount
    if (
      !["1 to 10", "11 to 50", "51 to 100", "Above 100"].includes(memberCount)
    ) {
      console.error("Invalid member count selected");
      return;
    }

    await postData({ messName: sanitizedMessName, memberCount }).then(
      async () => {
        await getData();
        router.push("/");
      }
    );

    setOpen(false);

    // Reset form fields
    setMessName("");
    setMemberCount("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start rounded-none px-4 py-2 text-sm font-normal"
        >
          Create Mess
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[350px]">
        <DialogHeader>
          <DialogTitle>Create a Mess</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="messName">Name of Mess</Label>
            <Input
              id="messName"
              value={messName}
              onChange={(e) => setMessName(e.target.value)}
              required
              maxLength={100}
              pattern="^[a-zA-Z0-9\s\-_]+$"
              title="Alphanumeric characters, spaces, hyphens, and underscores only"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="memberCount">Number of members</Label>
            <Select value={memberCount} onValueChange={setMemberCount} required>
              <SelectTrigger id="memberCount">
                <SelectValue placeholder="Select member count" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1 to 10">1 to 10</SelectItem>
                <SelectItem value="11 to 50">11 to 50</SelectItem>
                <SelectItem value="51 to 100">51 to 100</SelectItem>
                <SelectItem value="Above 100">Above 100</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="mt-4">
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
