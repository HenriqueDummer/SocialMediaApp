import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signin } from "../../utils/http";

const loginInputSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export type LoginInputSchema = z.infer<typeof loginInputSchema>;

const SigninForm = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: LoginInputSchema) => signin(data),
    onSuccess: () => {
      console.log("Success");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputSchema>({
    resolver: zodResolver(loginInputSchema),
  });

  function handleLogin(data: LoginInputSchema) {
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
          Login
        </Button>
      </form>
    </div>
  );
};

export default SigninForm;
