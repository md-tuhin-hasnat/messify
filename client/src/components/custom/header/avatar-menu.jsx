'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserCircle } from "lucide-react"
import { usePathname} from "next/navigation"
import { useEffect, useState } from "react"
import { backendURL } from "@/lib/secret"
export default function AvatarMenu() {

  const onLogout = async () => {
    try {
      const response = await fetch(`${backendURL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',  // Allow cookies
      });
      if (response.ok) {
        window.location.href = '/auth';
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const onProfile = () => console.log("Profile clicked");
  const onSettings = () => console.log("Settings clicked");


  const [userName, setUserName] = useState("My Account");
  const [userImage, setUserImage] = useState("");
  const pathName = usePathname();

  if(pathName === "/auth"){
    return <></>
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backendURL}/api/user`, {
          credentials: 'include',
        });

        if (response.ok) {
          const userdata = await response.json();
          setUserName(userdata.user.name);
          setUserImage(userdata.user.image);
        } else {
          console.error('Error fetching user data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();

  }, [""]);


  return (
    (<DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <Avatar className="h-8 w-8">
          <AvatarImage src={userImage} alt={userName} />
          <AvatarFallback>
            <UserCircle className="h-6 w-6" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>{userName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onProfile}>Profile</DropdownMenuItem>
        <DropdownMenuItem onClick={onSettings}>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>)
  );
}