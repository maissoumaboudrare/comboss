'use client'
import { useRouter } from "next/navigation";

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

import { useAuth } from "@/context/AuthContext";
import { Bounce, toast } from 'react-toastify';
import { CustomIcon } from "@/app/atoms/_components/icons/CustomIcons";


const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email required !")
    .email("Invalid email"),
  password: z
    .string()
    .trim()
    .min(8, "Password requires at least 8 characters !"),
});

type LoginValues = z.infer<typeof LoginSchema>;

const Login = () => {
  const { setIsAuthenticated, checkAuthStatus } = useAuth();
  const router = useRouter();

  const form = useForm<LoginValues>({
    resolver: zodResolver(LoginSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmitLogin = async (values: LoginValues) => {
    try {
      const response = await fetchAPI('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      await checkAuthStatus();
      setIsAuthenticated(true);
      toast.success("Welcome back, street fighter!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      router.push('/');

    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/google`;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmitLogin)}>
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Please login to access to your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="Email" />
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
                  <FormDescription/>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-8">
            <Button type="submit"  className="w-full">Login</Button>
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
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default Login;
