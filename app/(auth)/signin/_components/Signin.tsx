"use client";

import { useRouter } from "next/navigation";

import { CustomIcon } from "@/app/atoms/_components/icons/CustomIcons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { fetchAPI } from "@/lib/utils";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

const SigninSchema = z
  .object({
    pseudo: z
      .string()
      .min(2, {
        message: "Username must be at least 2 characters.",
      })
      .max(10, {
        message: "Username can't exceed 10 characters.",
      }),
    email: z.string().trim().min(1, "Email required !").email("Invalid email"),
    password: z
      .string()
      .min(8, "Password requires at least 8 characters !")
      .regex(passwordValidation, {
        message:
          "Password not valid! Add at least one uppercase letter, one lowercase letter, one number and one special character",
      }),
    confirmPassword: z
      .string()
      .min(8, "Password requires at least 8 characters !"),
    avatar: z
      .string()
      .url()
      .refine((val) => val !== "", {
        message: "Avatar is required!",
      }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

type SigninValues = z.infer<typeof SigninSchema>;

const Signin = () => {
  const form = useForm<SigninValues>({
    resolver: zodResolver(SigninSchema),
    mode: "onSubmit",
    defaultValues: {
      pseudo: "",
      email: "",
      password: "",
      confirmPassword: "",
      avatar: "",
    },
  });

  const [avatars, setAvatars] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const response = await fetchAPI("/api/characters", {
          method: "GET",
        });

        const thumbnails = response.map((char: any) => char.thumbnail);
        setAvatars(thumbnails);
      } catch (error) {
        console.error("Failed to fetch avatars:", error);
      }
    };

    fetchAvatars();
  }, []);

  const handleSubmitSignin = async (values: SigninValues) => {
    try {
      await fetchAPI("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pseudo: values.pseudo,
          email: values.email,
          password: values.password,
          avatar: values.avatar,
          isPremium: false,
        }),
      });

      router.push("/login");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/google`
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmitSignin)}>
        <Card>
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>
              Enter your infos below to create an account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="pseudo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="mycombosssname"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="name@example.com"
                    />
                  </FormControl>
                  <FormDescription>Please enter your email.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="******" />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="******" />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Select an Avatar</FormLabel>
                  <div className="flex flex-wrap gap-2 items-center">
                    {avatars.map((thumbnail, index) => (
                      <div
                        key={index}
                        className={`overflow-hidden w-11 h-11 rounded-lg cursor-pointer transition duration-300 ease-in-out hover:border-2 hover:border-primary hover:rotate-6 ${
                          field.value === thumbnail
                            ? "w-9 h-9 border-4 border-mute grayscale rotate-12"
                            : ""
                        }`}
                      >
                        <Image
                          src={thumbnail}
                          alt={`Avatar ${index}`}
                          className={
                            "cursor-pointer object-cover w-full h-full"
                          }
                          onClick={() => field.onChange(thumbnail)}
                          width={44}
                          height={44}
                        />
                      </div>
                    ))}
                  </div>
                  <FormDescription>
                    Select an avatar for your profile.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-8">
            <Button type="submit" className="w-full">
              Signin with Email
            </Button>
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <Button
              className="py-5 w-full gap-2"
              variant={"outline"}
              onClick={handleGoogleSignIn}
            >
              <CustomIcon name="gmail" size={20} /> Signin with your Google
              address
            </Button>

            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/legal-notice"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/legal-notice"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default Signin;
