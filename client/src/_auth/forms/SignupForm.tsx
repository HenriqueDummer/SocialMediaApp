import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { queryClient, signUp } from "../../utils/http";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const signUpInputSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z.string(),
    fullName: z
      .string()
      .min(2, { message: "Full name must be at least 2 characters long" })
      .max(16, { message: "Full name must be at most 16 characters long" }),
    username: z
      .string()
      .min(2, { message: "Username must be at least 2 characters long" })
      .max(16, { message: "Username must be at most 16 characters long" })
      .refine((s) => !s.includes(" "), {
        message: "Username must not contain spaces",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Attach error to confirmPassword field
  });

export type SignUpInputSchema = z.infer<typeof signUpInputSchema>;

const SignupForm = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: SignUpInputSchema) => signUp(data),
    onSuccess: (res) => {
      queryClient.setQueryData(["authUser"], { data: res.data });
      navigate("/");
      toast.success(res.message, {
        theme: "dark",
        autoClose: 2000,
      });
    },
    onError: (error) => {
      toast.error(error.message, { theme: "dark", autoClose: 4000 });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInputSchema>({
    resolver: zodResolver(signUpInputSchema),
  });

  function handleSignup(data: SignUpInputSchema) {
    mutate(data);
  }

  return (
    <div>
     <form onSubmit={handleSubmit(handleSignup)}>
        <div className="mb-4">
          <Label>Email</Label>
          <Input type="text" {...register("email")} />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <Label>Username</Label>
          <Input type="text" {...register("username")} />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>
        <div className="mb-4">
          <Label>Full Name</Label>
          <Input type="text" {...register("fullName")} />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName.message}</p>
          )}
        </div>
        <div className="mb-4">
          <Label>Password</Label>
          <Input className="w-full" type="password" {...register("password")} />
          {errors.password && (
            <p className="text-red-700 text-sm">{errors.password.message}</p>
          )}
        </div>
        <div className="mb-4">
          <Label>Confirm Password</Label>
          <Input type="password" {...register("confirmPassword")} />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
          )}
        </div>
        <Button className="mt-5 w-full" type="submit" disabled={isPending}>
          {isPending ? "Loading..." : "Sign Up"}
        </Button>
      </form>
      <div>
        <p>Already have an accout?</p>
        <NavLink to="/sign-in">Sign in</NavLink>
      </div>
    </div>
  );
};

export default SignupForm;
