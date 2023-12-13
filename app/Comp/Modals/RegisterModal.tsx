"use client";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import axios from "axios";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import { API_URL } from "@/app/config";

import useLoginModal from "@/app/hooks/useLoginModal";

const RegisterModal = () => {
  const RegisterModal = useRegisterModal();
  const LoginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log(data)
    axios
      .post(`${API_URL}user/register`, data)
      .then(() => {
        RegisterModal.onClose();
        toast.success("Account Created");
      })
      .catch((error) => {
        toast.error("Invalid Details");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onToggle = useCallback(() => {
    RegisterModal.onClose();
    LoginModal.onOpen();
  }, [RegisterModal, LoginModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <p className="text-center">Create an Account</p>
      <Input
        id="email"
        type="email"
        label="Email*"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        type="text"
        label="Name*"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        type="password"
        label="Password*"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="address"
        type="text"
        label="Address"
        disabled={isLoading}
        register={register}
        errors={errors}
        required={false}
      />
      <Input
        id="city"
        type="text"
        label="City"
        disabled={isLoading}
        register={register}
        errors={errors}
        required={false}
      />
      <Input
        id="languages"
        type="checkbox"
        label="Languages"
        disabled={isLoading}
        register={register}
        errors={errors}
        required={false}
        options={[
          "Hebrew",
          "French",
          "Arabic",
          "English",
          "Spanish",
          "Portuguese",
        ]}
      />
      <Input
        id="skills"
        type="checkbox"
        label="Skills"
        disabled={isLoading}
        register={register}
        errors={errors}
        required={false}
        options={[
          "Communication",
          "Manual work",
          "Programming",
          "Photography",
          "Content Creation",
          "Technical Writing",
        ]}
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <div 
        className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
      >
        <p>Already have an account?
          <span 
            onClick={onToggle} 
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
            > Log in</span>
        </p>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={RegisterModal.isOpen}
      title="Register"
      actionLabel="Sign Up"
      onClose={RegisterModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
