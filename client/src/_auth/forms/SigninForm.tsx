import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { mutateSignin } from "../../utils/hooks";

const signInInputSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export type SignInInputSchema = z.infer<typeof signInInputSchema>;

const SigninForm = () => {
  const { mutate: signIn, isPending } = mutateSignin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInputSchema>({
    resolver: zodResolver(signInInputSchema),
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
      <form onSubmit={handleSubmit(handleLogin)}>
        <p>
          <Label className="md:text-lg">Email</Label>
          <Input className="h-12" type="email" {...register("email")} />
        </p>
        <p className="mt-2">
          <Label className="md:text-lg">Password</Label>
          <Input className="h-12" type="password" {...register("password")} />
        </p>
        {errors.email && <p>{errors.email.message}</p>}
        {errors.password && <p>{errors.password.message}</p>}
        <Button
          className="mt-10 w-full bg-violet-700 hover:bg-violet-600 text-lg h-15"
          type="submit"
        >
          {isPending ? "Loading..." : "Login"}
        </Button>
      </form>
      <div className="mt-10 flex flex-col font-light items-center text-lg">
        <p>Don't have an account?</p>
        <NavLink to="/sign-up" className="text-violet-600">
          Sign up
        </NavLink>
      </div>
    </div>
  );
};

export default SigninForm;
