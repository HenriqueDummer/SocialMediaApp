import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

import {z} from "zod"
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { queryClient, signIn } from "../../utils/http";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const signUpInputSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
   confirmPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters long" })
    .max(16, { message: "Full name must be at most 16 characters long" }),
  username: z
  .string()
  .min(2, { message: "Username must be at least 2 characters long" })
  .max(16, { message: "Username must be at most 16 characters long" })
  .refine(s => !s.includes(" "), { message: "Username must not contain spaces" }),
});

export type LoginInputSchema = z.infer<typeof signUpInputSchema>;

const SignupForm = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: LoginInputSchema) => signIn(data),
     onSuccess: (res) => {
          queryClient.setQueryData(["authUser"], {data: res.data})
          navigate("/");
          toast.success(res.message, {
            theme: "dark",
            autoClose: 2000,
          });
        },
        onError: (error) => {
          toast.error(error.message, { theme: "dark", autoClose: 2000 });
        },
  });

   const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<LoginInputSchema>({
      resolver: zodResolver(signUpInputSchema),
    });

     function handleLogin(data: LoginInputSchema) {
        mutate(data);
      }
  
  return (
    <div>
    <form onSubmit={handleSubmit(handleLogin)}>
      <p>
        <Label>Username</Label>
        <Input type="text" {...register("username")} />
      </p>
      <p>
        <Label>Full name</Label>
        <Input type="text" {...register("fullName")} />
      </p>
      <p>
        <Label>Password</Label>
        <Input type="password" {...register("password")} />
      </p>
      <p>
        <Label>Confirm password</Label>
        <Input type="password" {...register("confirmPassword")} />
      </p>
      {errors.email && <p>{errors.email.message}</p>}
      {errors.password && <p>{errors.password.message}</p>}
      <Button className="mt-5 w-full" type="submit">
        {isPending ? "Loading..." : "Login"}
      </Button>
    </form>
    <div>
      <p>Already have an accout?</p>
      <NavLink to="/sign-in">Sign in</NavLink>
    </div>
  </div>
  )
}

export default SignupForm