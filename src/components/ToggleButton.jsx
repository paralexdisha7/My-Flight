import React, { useState } from 'react';

const ToggleButton = () => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className="flex items-center">
      {/* <span className="mr-2">Off</span> */}
      <button
        onClick={handleToggle}
        className={`relative inline-flex items-center h-3 w-10 rounded-full transition-colors duration-200 ease-in-out ${
          isToggled ? 'bg-[#1a4d2f]' : 'bg-[#2f2f2f]'
        }`}
      >
        <span className="sr-only">Toggle</span>
        <span
          className={`absolute left-0  h-5 w-5  rounded-full transition-transform duration-200 ease-in-out ${
            isToggled ? 'translate-x-5 bg-slate-300' : 'translate-x-0 bg-[#222222]'
          }`}
        ></span>
      </button>
      {/* <span className="ml-2">On</span> */}
    </div>
  );
};

export default ToggleButton;
