"use client";

import React, { useEffect, useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Modal from "./Modal";

import useEventModal from "@/app/hooks/useEventModal";
import { categoriesData } from "@/app/data/categoriesData";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import { Range } from 'react-date-range';
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import { API_URL } from "@/app/config";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Calendar from "../inputs/Calendar";
import { formatISO } from "date-fns";
import { iconMapping } from "@/app/events/[eventId]/EventCategory";



enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  DATE = 2,
  INFO = 3,
  IMAGES = 4,
}

const EventModal = () => {
  const EventModal = useEventModal();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      address: "",
      title: "",
      imageUrl: "",
      startDate:"",
      endDate:"",
      capacity: 1,
      description: "",
      languages: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.IMAGES) {
      onNext();
      return;
    }

    let dataWithLocationLabel = { ...data };

    if (data.location && data.location.label) {
      dataWithLocationLabel = {
        ...data,
        location: data.location.label,
      };
    }

    setIsLoading(true);
    axios
      .post(`${API_URL}/user/event`, dataWithLocationLabel)
      .then(() => {
        toast.success("Listing created!");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        EventModal.onClose();
      })
      .catch((error) => {
        console.log(error.message)
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const selCategory = watch("category");
  const location = watch("location");
  const capacity = watch("capacity");
  const imageSrc = watch("image_url");
  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value);
    shouldValidate: true;
    shouldDirty: true;
    shouldTouch: true;
  };

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      setValue('startDate', formatISO(dateRange.startDate));
      setValue('endDate', formatISO(dateRange.endDate));
    }
  }, [dateRange, setValue]);

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
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <div
      className="
    flex
    flex-col
    gap-2
    "
    >
      <div className="text-2xl font-bold ">
        Which of these best describes your event?
      </div>
      <div className="font-light text-neutral-500 mt-2">Pick a category</div>
      <div
        className="
      grid
      grid-cols-1
      md:grid-cols-2
      gap-3
      md:max-h-[47vh]
      max-h-[64vh]
      overflow-y-auto"
      >
        {categoriesData.map((category) => {
          const Icon = iconMapping[category.icon];

          return(
          <div key={category.label} className="col-span-1">
            <CategoryInput
              onClick={(clickedCategory) => {
                if (selCategory === clickedCategory) {
                  setCustomValue("category", "");
                } else {
                  setCustomValue("category", clickedCategory);
                }
              }}
              selected={selCategory === category.label}
              label={category.label}
              icon={category.icon}
            >
            { Icon && <Icon size={20} />}
            </CategoryInput>
          </div>
        );
            })}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-2">
        <div className="text-2xl font-bold">Where is your event located?</div>
        <div className="font-light text-neutral-500 mt-2 mb-6">
          Help volunteers find your event!
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

  if (step === STEPS.DATE) {
    bodyContent = (
    <div className="flex flex-col gap-2">
      <div className="text-2xl font-bold">When do you wanna volunteer?</div>
      <div className="font-light text-neutral-500 mt-2 mb-6">
        Find the volunteering opportunity that matches your availability!
        <Calendar
        value={dateRange}
        onChange={(value) => setDateRange(value.selection)}/>
      </div>
      </div>)
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-2">
        <div className="text-2xl font-bold">Share some basics about your event</div>
        <div className="font-light text-neutral-500 mt-2 mb-6">
          Help volunteers understand further your needs.
        </div>
        <Input
           id="title"
           type="text"
           label="Title*"
           disabled={isLoading}
           register={register}
           errors={errors}
           required
           />
           <Input
           id="description"
           type="textarea"
           label="Description*"
           disabled={isLoading}
           register={register}
           errors={errors}
           required
           />
           <br/>
           <Input
           id="address"
           type="text"
           label="Address*"
           disabled={isLoading}
           register={register}
           errors={errors}
           required
           />
           <br/>
        <Counter 
          title="Number of volunteers"
          subtitle="How many people can volunteer?"
          value={capacity}
          onChange={(value) => setCustomValue("capacity", value)}
           />
           <br/>
      </div>
    )
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-2">
        <div className="text-2xl font-bold">Add a cover image for your event!</div>
        <div className="font-light text-neutral-500 mt-2 mb-6">
          Show your volunteers what your opportunity looks like!
        </div>
        <ImageUpload
         value={imageSrc}
         onChange={(value) => setCustomValue('image_url', value)} />
      </div>
    );
  }

  return (
    <Modal
      title="Create an event!"
      isOpen={EventModal.isOpen}
      onClose={EventModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      disabled={isLoading}
      actionLabel={actionLabel}
      secondaryLabel={secondaryLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default EventModal;
