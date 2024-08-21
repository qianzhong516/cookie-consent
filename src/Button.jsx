import { twMerge } from 'tailwind-merge';

const Button = ({
  type = 'primary',
  onClick,
  children,
  disabled,
  className
}) => {
  let styles = '';

  if (type === 'primary') {
    styles = 'bg-indigo-700 text-white hover:bg-[#3730A3] focus:bg-[#3730A3] focus:ring';
  } else if (type === 'secondary') {
    styles = 'bg-white text-[#171717] border border-[#e6e6e6] shadow hover:bg-[#FAFAFA] focus:bg-[#FAFAFA] focus:ring';
  } else if (type === 'tetiary') {
    styles = 'bg-red-600 text-white hover:bg-[#B91C1C] focus:bg-[#B91C1C] focus:ring';
  }

  return (
    <button
      className={twMerge(
        'text-sm rounded-md self-end py-2 px-4 disabled:bg-neutral-100 disabled:text-neutral-500 focus:outline-none',
        styles,
        className
      )}
      onClick={onClick}
      disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;