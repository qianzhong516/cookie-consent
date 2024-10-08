import { twMerge } from 'tailwind-merge';

const ToggleSlider = ({ on, onToggle, disabled, ariaLabel }) => {
    const knobClasses = 'before:absolute before:content-[""] before:top-1/2 before:-translate-y-1/2 before:left-1 before:w-[15px] before:h-[15px] before:bg-white before:rounded-full before:transition-all before:duration-400';

    const knobCheckedClasses = 'peer-disabled:bg-gray-100 peer-disabled:hover:bg-gray-100 peer-checked:bg-indigo-700 peer-checked:hover:bg-[#3730A3] before:peer-checked:left-full before:peer-checked:-translate-x-[calc(100%+4px)]';

    return (
        <label className='relative w-[44px] h-[24px] cursor-pointer has-[:disabled]:cursor-default'>
            <input type="checkbox" checked={on} onChange={onToggle} className={twMerge('appearance-none peer w-[44px] h-[24px] rounded-xl focus-visible:outline-none focus-visible:ring focus-visible:ring-slate-200 focus-visible:checked:ring focus-visible:checked:ring-indigo-300')} disabled={disabled} aria-label={ariaLabel} />
            <span className={twMerge('absolute inset-0 bg-gray-100 rounded-xl transition duration-400 hover:bg-[#D1D5DB] ', knobClasses, knobCheckedClasses)}></span>
        </label>
    );
}

export default ToggleSlider;