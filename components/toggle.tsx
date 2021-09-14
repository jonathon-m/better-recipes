import { useState } from 'react';

export default function Toggle(props: {
  label: string;
  initial: boolean;
  onChange: (value: boolean) => void;
}) {
  const [isChecked, setIsChecked] = useState(props.initial);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
    props.onChange(!isChecked);
  };

  return (
    <>
      <style>
        {`.toggle-checkbox:checked {
        @apply: right-0 border-green-400;
        right: 0;
        border-color: #68D391;
        }
        .toggle-checkbox:checked + .toggle-label {
        @apply: bg-green-400;
        background-color: #68D391;
        }`}
      </style>
      <div className='relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in'>
        <input
          type='checkbox'
          name='toggle'
          id='toggle'
          checked={isChecked}
          onChange={handleOnChange}
          className='toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer'
        />
        <label className='toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer'></label>
      </div>
      <label className='select-none text-sm text-gray-700'>{props.label}</label>
    </>
  );
}
