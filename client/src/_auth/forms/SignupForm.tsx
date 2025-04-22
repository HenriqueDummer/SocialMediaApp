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
import { mutateSignup } from "../../utils/hooks";

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
  const {mutate: signUp, isPending} = mutateSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInputSchema>({
    resolver: zodResolver(signUpInputSchema),
  });

  function handleSignup(data: SignUpInputSchema) {
    signUp(data);
  }

  return (
    <div className="text-slate-200 max-w-[60%]">
      <div className="mb-16">
        <h1 className="text-2xl md:text-7xl text-slate-200">Welcome</h1>
        <h2 className="text-3xl text-slate-300 mt-2">
          Let's create e new account!
        </h2>
      </div>
     <form onSubmit={handleSubmit(handleSignup)}>
        <div className="mb-4">
          <Label className="text-lg">Email</Label>
          <Input className="h-12" type="text" {...register("email")} />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <Label className="text-lg">Username</Label>
          <Input className="h-12" type="text" {...register("username")} />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>
        <div className="mb-4">
          <Label className="text-lg">Full Name</Label>
          <Input className="h-12" type="text" {...register("fullName")} />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName.message}</p>
          )}
        </div>
        <div className="mb-4">
          <Label className="text-lg">Password</Label>
          <Input className="h-12" type="password" {...register("password")} />
          {errors.password && (
            <p className="text-red-700 text-sm">{errors.password.message}</p>
          )}
        </div>
        <div className="mb-4">
          <Label className="text-lg">Confirm Password</Label>
          <Input className="h-12" type="password" {...register("confirmPassword")} />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
          )}
        </div>
        <Button className="mt-10 w-full bg-violet-700 hover:bg-violet-600 text-lg h-15" type="submit" disabled={isPending}>
          {isPending ? "Loading..." : "Sign Up"}
        </Button>
      </form>
      <div className="mt-10 flex flex-col font-light items-center text-lg">
        <p>Already have an account?</p>
        <NavLink to="/sign-in" className="text-violet-600">
          Sign in
        </NavLink>
      </div>
    </div>
  );
};

export default SignupForm;
