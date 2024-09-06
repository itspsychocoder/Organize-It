"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUserStore } from "@/store/store"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-hot-toast"

export const description =
  "A simple login form with email and password. The submit button says 'Sign in'."

export default function LoginForm() {
  const {IsLogin, SetEmail,SetIsLogin, SetUserId, SetUsername} = useUserStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const showToast = (message:any) => toast.success(message);
  const logintoAccount = () => {
   if (email == "" || password == "") {
    toast.error("Fill all fields to create your account.");
   }
   else {
    fetch(`/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
       
          if (data.type == "success") {
            SetIsLogin(true);
            SetEmail(email);
            SetUserId(data.userId);
            localStorage.setItem("token", data.token);
            localStorage.setItem("refresh_token", data.refreshToken);
            toast.success(data.message);
            router.push("/");
          }
          else {
            toast.error(data.message);
      }
      });
   }
  };
  return (
  <div className="h-[100vh] flex justify-center items-center">
      <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input value={email} onChange={e=>setEmail(e.target.value)} id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={logintoAccount} className="w-full">Sign in</Button>
      </CardFooter>
    </Card>
  </div>
  )
}
