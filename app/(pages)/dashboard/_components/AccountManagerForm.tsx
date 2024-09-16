"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useRouter } from "next/navigation";
import { fetchAPI } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CustomIcon } from "@/app/atoms/_components/icons/CustomIcons";

import { toast, Bounce } from "react-toastify";
import { changeAvatar, changePassword, deleteUser } from "@/utils/api";

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

const passwordSchema = z.object({
  oldPassword: z.string().min(8, "Password requires at least 8 characters!"),
  newPassword: z
    .string()
    .min(8, "Password requires at least 8 characters !")
    .regex(passwordValidation, {
      message:
        "Password not valid! Add at least one uppercase letter, one lowercase letter, one number and one special character",
    }),
});

const avatarSchema = z.object({
  avatarUrl: z
    .string()
    .url("Invalid URL")
    .regex(/\.(jpeg|jpg|gif|png|webp)$/i, "URL must point to an image"),
});

export type PasswordValues = z.infer<typeof passwordSchema>;
export type AvatarValues = z.infer<typeof avatarSchema>;

const AccountManagerForm = () => {
  const { user, setUser } = useAuth();
  const router = useRouter();
  const passwordForm = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
  });
  const avatarForm = useForm<AvatarValues>({
    resolver: zodResolver(avatarSchema),
  });

  const handleDeleteAccount = async () => {
    try {
      await deleteUser(user?.userID);
      toast.success("Account deleted successfully!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      router.push("/signin");
    } catch (error) {
      toast.error("Failed to delete account.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      console.error("Failed to delete account:", error);
    }
  };

  const handleChangePassword = async (values: PasswordValues) => {
    try {
      await changePassword(user?.userID, values);
      toast.success("Password changed successfully!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      passwordForm.reset({ oldPassword: "", newPassword: "" });
    } catch (error) {
      toast.error("Failed to change password.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      console.error("Failed to change password:", error);
    }
  };

  const handleChangeAvatar = async (values: AvatarValues) => {
    try {
      await changeAvatar(user?.userID, values);
      toast.info("Avatar change submitted. Verification in progress.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      setUser({ ...user, avatar: values.avatarUrl });
      avatarForm.reset({ avatarUrl: "" });
    } catch (error) {
      toast.error("Failed to change avatar.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      console.error("Failed to change avatar:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dashboard ⚙️</CardTitle>
        <CardDescription>Manage your account.</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-2 mb-2">
        <div className="relative w-full mb-3">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Change your password
            </span>
          </div>
        </div>

        <Form {...passwordForm}>
          <form onSubmit={passwordForm.handleSubmit(handleChangePassword)}>
            <div className="flex flex-col gap-3 mb-6">
              <FormField
                control={passwordForm.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Old Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        placeholder="Old Password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={passwordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        placeholder="New Password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="py-5 w-full gap-2 mt-4">
                <CustomIcon name="password" size={20} fill="#fff" />
                Change Password
                <CustomIcon name="password" size={20} fill="#fff" />
              </Button>
            </div>
          </form>
        </Form>

        <div className="relative w-full mb-3">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Change your avatar
            </span>
          </div>
        </div>

        <Form {...avatarForm}>
          <form onSubmit={avatarForm.handleSubmit(handleChangeAvatar)}>
            <div className="flex flex-col gap-3">
              <FormField
                control={avatarForm.control}
                name="avatarUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Avatar URL</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        {...field}
                        placeholder="New Avatar URL"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="py-5 w-full gap-2 mt-4">
                <CustomIcon name="avatar" size={20} fill="#fff" />
                Change Avatar
                <CustomIcon name="avatar" size={20} fill="#fff" />
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex flex-col gap-8">
        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Danger zone
            </span>
          </div>
        </div>

        <Button
          onClick={handleDeleteAccount}
          className="py-5 w-full gap-2 bg-red-500 hover:bg-muted"
        >
          <CustomIcon name="alert" size={20} fill="#fff" />
          Delete Account
          <CustomIcon name="alert" size={20} fill="#fff" />
        </Button>

        <p className="px-8 text-center text-xs text-muted-foreground">
          Deleting your account will permanently remove all your data, including
          your added combos.
        </p>
      </CardFooter>
    </Card>
  );
};

export default AccountManagerForm;
