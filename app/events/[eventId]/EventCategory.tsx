import React from 'react';
import {
  FaHandsHelping,
  FaChalkboardTeacher,
  FaHospital,
  FaTree,
  FaPaw,
  FaFirstAid,
  FaPalette,
  FaFootballBall,
  FaBalanceScale,
  FaCode,
  FaUserTie,
  FaHome,
  FaUsers,
  FaHeartbeat,
  FaSeedling,
} from 'react-icons/fa';

import { IconType } from "react-icons";


interface EventCategoryProps {
  icon: string;
  label: string;
  description: string;
}

const iconMapping: { [key: string]: IconType } = {
  FaHandsHelping,
  FaChalkboardTeacher,
  FaHospital,
  FaTree,
  FaPaw,
  FaFirstAid,
  FaPalette,
  FaFootballBall,
  FaBalanceScale,
  FaCode,
  FaUserTie,
  FaHome,
  FaUsers,
  FaHeartbeat,
  FaSeedling,
};

const EventCategory: React.FC<EventCategoryProps> = ({ icon, label, description }) => {
  const Icon = iconMapping[icon];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <Icon className="text-neutral-600" size={40} />
        <div className="flex flex-col">
          <div className="text-lg font-semibold">{label}</div>
          <div className="text-neutral-500 font-light">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default EventCategory;