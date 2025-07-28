import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { useSignIn } from "../../hooks/useSignIn";

const signInInputSchema = z.object({
  email: z.string().nonempty("Email is required").email(),
  password: z
    .string().nonempty("Password is required")
    .min(6, "Pasword must be at least 6 characters long!"),
});

export type SignInInputSchema = z.infer<typeof signInInputSchema>;


export const Route = createFileRoute('/_auth/_layout/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const { mutate: signIn, isPending } = useSignIn();

  const signInForm = useForm<SignInInputSchema>({
    resolver: zodResolver(signInInputSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  function handleLogin(data: SignInInputSchema) {
    signIn(data);
  }
  
  return (
    <div className="w-[80%] max-w-[30rem] xl:max-w-[60%]  text-slate-200 ">
      <div className="mb-16">
        <h1 className="text-5xl md:text-7xl text-slate-200">Welcome back</h1>
        <h2 className="text-2xl md:text-3xl text-slate-300 mt-2">
          Login into your account
        </h2>
      </div>
      <Form {...signInForm}>
        <form onSubmit={signInForm.handleSubmit(handleLogin)} className="flex flex-col gap-4">
          <FormField control={signInForm.control} name="email" render={({ field }) => {
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
          <FormField control={signInForm.control} name="password" render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Passord</FormLabel>
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
            {isPending ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Form>
      <div className="mt-10 flex flex-col font-light items-center text-lg">
        <p>Don't have an account?</p>
        <Link to="/sign-up" className="text-violet-600">
          Sign up
        </Link>
      </div>
    </div>
  );
}
