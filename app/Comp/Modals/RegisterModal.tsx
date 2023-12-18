"use client";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import axios from "axios";
import { useCallback, useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import { API_URL } from "@/app/config";
import { skillsData } from "@/app/data/skillsData";

import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import CategoryInput from "../inputs/CategoryInput";
import ImageUpload from "../inputs/ImageUpload";

enum STEPS {
  IDENTITY = 0,
  LOCATION = 1,
  INFO = 2,
  SKILLS = 3,
  IMAGES = 4,
}

const RegisterModal = () => {
  const RegisterModal = useRegisterModal();
  const LoginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.IDENTITY);
  const router = useRouter();

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value);
    shouldValidate: true;
    shouldDirty: true;
    shouldTouch: true;
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      image_url: "",
      bio: "",
      location: null,
      skills: [],
      profession: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.IMAGES) {
      onNext();
      return;
    }

    setIsLoading(true);
    axios
      .post(`${API_URL}/user/register`, data)
      .then(() => {
        RegisterModal.onClose();
        toast.success("Account Created");
        reset();
        setStep(STEPS.IDENTITY);
        RegisterModal.onClose();
      })
      .catch((error) => {
        console.log(error.message);
        toast.error("Invalid Details");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const selSkills = watch("skills");
  const location = watch("location");
  const imageSrc = watch("image_url");

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.IMAGES) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryLabel = useMemo(() => {
    if (step === STEPS.IDENTITY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  const onToggle = useCallback(() => {
    RegisterModal.onClose();
    LoginModal.onOpen();
  }, [RegisterModal, LoginModal]);

  let bodyContent = (
    <div className="flex flex-col gap-2">
      <div className="text-2xl font-bold">Set up your account details!</div>
      <div className="font-light text-neutral-500 mt-2 mb-6">
        Let's start with the basics...
      </div>
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
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-2">
        <div className="text-2xl font-bold">Where are you located?</div>
        <div className="font-light text-neutral-500 mt-2 mb-6">
          Help us find you volunteering opportunities!
        </div>
        <div className="mb-6">
          <CountrySelect
            value={location}
            onChange={(value) => setCustomValue("location", value)}
          />
        </div>
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-2">
        <div className="text-2xl font-bold">Share some info about yourself</div>
        <div className="font-light text-neutral-500 mt-2 mb-6">
          Let us know more about you!
        </div>
        <Input
          id="profession"
          type="text"
          label="Profession*"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="bio"
          type="textarea"
          label="Bio*"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.SKILLS) {
    bodyContent = (
      <div className="flex flex-col gap-2">
        <div className="text-2xl font-bold">What are your skills?</div>
        <div className="font-light text-neutral-500 mt-2 mb-6">
          What can you help with?
        </div>
        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-3
          md:max-h-[47vh]
          max-h-[52vh]
          overflow-y-auto"
        >
          {skillsData.map((skill) => (
            <div key={skill.label} className="col-span-1">
              <CategoryInput
                onClick={() => {
                  if (selSkills.includes(skill.label)) {
                    setCustomValue("skills", selSkills.filter((s: string) => s !== skill.label));
                  } else {
                    setCustomValue("skills", [...selSkills, skill.label]);
                  }
                }}
                selected={selSkills.includes(skill.label)}
                label={skill.label}
                icon={skill.icon}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-2">
        <div className="text-2xl font-bold">Add a profile picture</div>
        <div className="font-light text-neutral-500 mt-2 mb-6">
          Let's add a profile picture!
        </div>
        <ImageUpload
         value={imageSrc}
         onChange={(value) => setCustomValue('image_url', value)} />
      </div>
    );
  }

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
        <p>
          Already have an account?
          <span
            onClick={onToggle}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={RegisterModal.isOpen}
      title="Register"
      actionLabel={actionLabel}
      secondaryLabel={secondaryLabel}
      secondaryAction={step === STEPS.IDENTITY ? undefined : onBack}
      onClose={RegisterModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
