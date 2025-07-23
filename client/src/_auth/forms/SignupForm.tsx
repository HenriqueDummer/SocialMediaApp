import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { useSignUp } from "../../hooks/useSignUp";

const signUpInputSchema = z
  .object({
    email: z.string().nonempty("Email is required").email(),
    password: z
      .string()
      .nonempty("Password is required")
      .min(6, { message: "Password must be at least 6 characters long!" }),
    confirmPassword: z.string(),
    fullName: z
      .string()
      .nonempty("Full name is required")
      .min(2, { message: "Full name must be at least 2 characters long" })
      .max(16, { message: "Full name must have less than 16 characters long" }),
    username: z
      .string()
      .nonempty("Username is required")
      .min(2, { message: "Username must be at least 2 characters long" })
      .max(16, { message: "Username must have less than 16 characters long" })
      .refine((s) => !s.includes(" "), {
        message: "Username must not contain spaces",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpInputSchema = z.infer<typeof signUpInputSchema>;

const SignupForm = () => {
  const { mutate: signUp, isPending } = useSignUp();

  const signUpForm = useForm<SignUpInputSchema>({
    resolver: zodResolver(signUpInputSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      username: ""
    }
  });

  function handleSignup(data: SignUpInputSchema) {
    signUp(data);
  }

  return (
    <div className="w-[80%] max-w-[30rem] xl:max-w-[60%]  text-slate-200 ">
      <div className="mb-16">
        <h1 className="text-2xl md:text-7xl text-slate-200">Welcome</h1>
        <h2 className="text-3xl text-slate-300 mt-2">
          Let's create e new account!
        </h2>
      </div>
      <Form {...signUpForm}>
        <form onSubmit={signUpForm.handleSubmit(handleSignup)} className="flex flex-col gap-4">
          <FormField control={signUpForm.control} name="email" render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }} />
          <FormField control={signUpForm.control} name="username" render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }} />
          <FormField control={signUpForm.control} name="fullName" render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }} />
          <FormField control={signUpForm.control} name="password" render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password"  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }} />
          <FormField control={signUpForm.control} name="confirmPassword" render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }} />
          <Button
            className="mt-10 w-full bg-violet-700 hover:bg-violet-600 text-lg h-15"
            type="submit"
          >
            {isPending ? "Signin up..." : "Sign up"}
          </Button>
        </form>
      </Form>
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
