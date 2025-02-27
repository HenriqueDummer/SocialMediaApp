import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "../../utils/http";
import { useNavigate, NavLink } from "react-router-dom";

const signInInputSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export type SignInInputSchema = z.infer<typeof signInInputSchema>;

const SigninForm = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: SignInInputSchema) => signIn(data),
    onSuccess: (res) => {
      console.log("Success");
      console.log(res)
      navigate("/");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInputSchema>({
    resolver: zodResolver(signInInputSchema),
  });

  function handleLogin(data: SignInInputSchema) {
    mutate(data);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleLogin)}>
        <p>
          <Label>Email</Label>
          <Input type="email" {...register("email")} />
        </p>
        <p>
          <Label>Password</Label>
          <Input type="password" {...register("password")} />
        </p>
        {errors.email && <p>{errors.email.message}</p>}
        {errors.password && <p>{errors.password.message}</p>}
        <Button className="mt-5 w-full" type="submit">
          {isPending ? "Loading..." : "Login"}
        </Button>
      </form>
      <div>
        <p>Don't have an accout?</p>
        <NavLink to="/sign-up">Sign up</NavLink>
      </div>
    </div>
  );
};

export default SigninForm;
