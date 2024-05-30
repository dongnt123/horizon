"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormElement from "./form/FormElement";
import { authFormSchema } from "@/lib/utils";
import { signIn, signUp } from "@/lib/actions/user.action";

const AuthForm = ({ type }: { type: string }) => {

  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isPending, startTransition] = useTransition();
  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    startTransition(() => {
      if (type === "sign-up") {
        signUp(data)
          .then((newUser) => {
            setUser(newUser);
          });
      }
      if (type === "sign-in") {
        const userData = {
          email: data.email,
          password: data.password
        };
        signIn(userData)
          .then(() => {
            router.push("/");
          });
      }
    });
  }

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer flex items-center gap-1">
          <Image src="/icons/logo.svg" width={34} height={34} alt="Horizon" className="size-[24px] max-xl:size-14" />
          <h1 className="sidebar-logo">Horizon</h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-46 font-semibold text-gray-900">{user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}</h1>
          <p className="text-16 font-normal font-gray-600">{user ? "Link your account to get started" : "Please enter your details"}</p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">

        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <FormElement control={form.control} name="firstName" label="First Name" placeHolder="ex: John" />
                    <FormElement control={form.control} name="lastName" label="Last Name" placeHolder="ex: Doe" />
                  </div>
                  <FormElement control={form.control} name="address1" label="Address" placeHolder="Enter your specific address" />
                  <FormElement control={form.control} name="city" label="City" placeHolder="Enter your city" />
                  <div className="flex gap-4">
                    <FormElement control={form.control} name="state" label="State" placeHolder="ex: NY" />
                    <FormElement control={form.control} name="postalCode" label="Postal Code" placeHolder="ex: 1101" />
                  </div>
                  <div className="flex gap-4">
                    <FormElement control={form.control} name="dateOfBirth" label="Date of Birth" placeHolder="YYYY-MM-DD" />
                    <FormElement control={form.control} name="ssn" label="SSN" placeHolder="ex: 1234" />
                  </div>
                </>
              )}
              <FormElement control={form.control} name="email" label="Email" placeHolder="Enter your email" />
              <FormElement control={form.control} name="password" label="Password" type="password" placeHolder="Enter your password" />
              <div className="flex flex-col gap-4">
                <Button type="submit" className="form-btn" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
                    </>
                  ) : type === "sign-in" ? "Sign In" : "Sign Up"}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">{type === "sign-in" ? "Don't have an account? " : "Already have an account? "}</p>
            <Link href={type === "sign-in" ? "/sign-up" : "/sign-in"} className="form-link">
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </footer>
        </>
      )
      }
    </section >
  )
}

export default AuthForm;