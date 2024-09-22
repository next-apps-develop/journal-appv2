import React, { useEffect, useState } from "react";
import ButtonGeneral from "../ButtonGeneral";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

const FormLogin = () => {
  const [error, seterror] = useState(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    // watch,
    // setValue,
    reset,
  } = useForm({
    defaultValues: {
      // fullName: 'Henry',
      email: 'test@gmail6.com',
      password: '111111'
    }
  });

  const notify = () => {
    toast(error);
    toast.onChange((v) => {
      if (v.status === "removed") {
        seterror(null);
      }
    });
  };

  useEffect(() => {
    if (error) toast(error);
  }, [error]);

  useEffect(() => {
    reset();
  }, [reset]);

  const onSubmit = handleSubmit(async (data) => {
    const { email, password } = data;
    const resSignIn = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (resSignIn?.error) {
      seterror(resSignIn.error as any);
      notify();
    }
    if (resSignIn?.ok) router.push("/dashboard");
  });
  return (
    <>
      <ToastContainer />
      <form
        action=""
        onSubmit={onSubmit}
        autoComplete="off"
        className="w-full px-8"
      >
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="someemail@gmail.com"
          autoComplete="off"
          {...register("email", {
            required: {
              value: true,
              message: "Email is required",
            },
            pattern: {
              value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              message: "email is not valid",
            },
          })}
        />
        {errors.email && (
          // @ts-ignore
          <span className="text-red-400 block">
            {errors.email?.message as any}
          </span>
        )}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="*****"
          className="bg-zinc-800 px-4 py-2 block mb-2 w-full text-white"
          {...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
            minLength: {
              value: 6,
              message: "Password must be at least 6 characers",
            },
          })}
          autoComplete="new-password"
        />
        {errors.password && (
          <span className="text-red-400 block">
            {errors.password?.message as any}
          </span>
        )}
        <ButtonGeneral text="Log In" />
      </form>
    </>
  );
};

export default FormLogin;
