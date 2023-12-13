'use client'

import React, { useMemo, useState } from 'react'

import Modal from './Modal'

import useEventModal from '@/app/hooks/useEventModal';

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    REQUIREMENTS = 5
};

const EventModal = () => {
    const EventModal = useEventModal();
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(STEPS.CATEGORY)

const onBack = () => {
    setStep((value) => value -1)
};

const onNext = () => {
    setStep((value) => value +1)
};

const actionLabel = useMemo(() => {
    if (step === STEPS.REQUIREMENTS){
        return 'Create'
    }
    return 'Next'
}, [step]);

const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
        return undefined;
    }
}, [step]);

let bodyContent = (
    <div className="
    flex
    flex-col
    gap-2
    ">
    <div className="text-2xl font-bold">
        Which of these best describes your event?
      </div>
      <div className="font-light text-neutral-500 mt-2">
        Pick a category
      </div>
      <div className="
      grid
      grid-cols-1
      md:grid-cols-2
      gap-3
      max-h-[50vh]
      overflow-y-auto">
        //categories
      </div>
    </div>
)

  return (
    <Modal
    title= "Create an event!"
    isOpen={EventModal.isOpen}
    onClose={EventModal.onClose}
    onSubmit={EventModal.onClose}
    disabled={isLoading}
    actionLabel={actionLabel}
    secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
    body = {bodyContent}
    />
  )
}

export default EventModal