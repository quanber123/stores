import React from 'react';
type Props = {
  isActive: boolean | string | null;
  toggleNotify: () => void;
};
const EditButtonNotify: React.FC<Props> = ({ isActive, toggleNotify }) => {
  return (
    <div
      className={`toggle-btn-notify w-[42px] h-[20px] rounded-[16px] cursor-pointer ${
        isActive ? 'active bg-purple' : 'bg-gray'
      }`}
      onClick={toggleNotify}
    ></div>
  );
};

export default EditButtonNotify;
