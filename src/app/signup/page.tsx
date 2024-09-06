"use client"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import toast from "react-hot-toast";
import { useState } from "react"
import { useRouter } from "next/navigation"
export const description =
  "A sign up form with first name, last name, email and password inside a card. There's an option to sign up with GitHub and a link to login if you already have an account"

export default function LoginForm() {


  const router = useRouter();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
 
  const createAccount = () => {
    console.log("Creating account...");
   if (email == "" || firstName == "" || lastName == "" || password == "") {
    toast.error("Fill all fields to create your account.");
   }
   else {
    fetch(`/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errorCode == 11000) {
          // User already exist with this username
          toast.error("A User already exist with username you provided. Please enter another username.");
        } else {
          if (data.type == "success") {
            toast.success(data.message);
            router.push("/");
          }
          else {
            toast.error(data.message);
          }
        }
      });
   }
  };

  return (
  <div className="h-[100vh] flex justify-center items-center">
      <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">First name</Label>
              <Input value={firstName} onChange={e=>setFirstName(e.target.value)} id="first-name" placeholder="Max" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input value={lastName} onChange={e=>setLastName(e.target.value)} id="last-name" placeholder="Robinson" required />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={e=>setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input value={password} onChange={e=>setPassword(e.target.value)} id="password" type="password" />
          </div>
          <Button onClick={createAccount} type="submit" className="w-full">
            Create an account
          </Button>

        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  </div>
  )
}
