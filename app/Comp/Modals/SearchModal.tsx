"use client";

import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import useSearchParams from "@/app/hooks/useSearchParams";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import queryString from "query-string";
import { formatISO } from 'date-fns';
import Calendar from "../inputs/Calendar";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
}

const SearchModal = () => {
  const SearchModal = useSearchModal();
  const router = useRouter();
  const {
    category,
    startDate,
    endDate,
    location,
    setCategory,
    setEndDate,
    setStartDate,
    setLocation,
  } = useSearchParams();

  const [step, setStep] = useState(STEPS.LOCATION);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const handleClick = useCallback(async () => {
    if (step !== STEPS.DATE) {
      return onNext();
    }

    if (dateRange.startDate) {
      const formatStartDate = formatISO(dateRange.startDate);
      setStartDate(formatStartDate);
    }

    if (dateRange.endDate) {
      const formatEndDate = formatISO(dateRange.endDate);
      setEndDate(formatEndDate);
    }

    console.log("startDate", startDate)
    console.log("endDate", endDate)

    const newParams = {
      ...(location.label && { location: location.label }),
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
      ...(category && { category }),
    };

    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: newParams,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    SearchModal.onClose();

    router.push(url);
  }, [step, startDate, endDate, location, category]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.DATE) {
      return "Search";
    }
    return "Next";
  }, [step]);

  const secondaryLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-2">
      <div className="text-2xl font-bold">Where do you wanna volunteer?</div>
      <div className="font-light text-neutral-500 mt-2 mb-6">
        Find the perfect place!
      </div>
      <div className="mb-6">
        <CountrySelect
          value={location}
          onChange={(value) => setLocation(value as CountrySelectValue)}
        />
      </div>
      <Map center={location?.latlng} />
    </div>
  );

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

  return (
    <Modal
      isOpen={SearchModal.isOpen}
      onClose={SearchModal.onClose}
      onSubmit={handleClick}
      title="Filters"
      actionLabel={actionLabel}
      secondaryLabel={secondaryLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default SearchModal;
