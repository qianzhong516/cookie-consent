import Modal from './Modal';
import { memo, useCallback, useState } from 'react';
import Button from './Button';
import ToggleSlider from './ToggleSlider';
import { CATEGORIES } from './constants'

const manageCookieContent = [
    { id: CATEGORIES.ESSENTIAL, title: 'Essentials', subtitle: 'These cookies are essential for the proper functioning of our services and cannot be disabled.' },
    { id: CATEGORIES.ANALYTICS, title: 'Analytics', subtitle: 'These cookies collect information about how you use our services or potential errors you encounter. Based on this information we are able to improve your experience and react to any issues.' },
    { id: CATEGORIES.MARKETING, title: 'Marketing', subtitle: 'These cookies allow us to show you advertisements relevant to you through our advertising partners.' },
];

const ManageCookieItem = memo(function ManageCookieItem({ title, subtitle, isOn, onToggle, disabled }) {
    return <div className='flex flex-col '>
        <div className='flex justify-between items-center'>
            <h3 className='text-md font-bold text-neutral-900'>{title}</h3>
            <ToggleSlider on={isOn} onToggle={onToggle} disabled={disabled} />
        </div>
        <p className='text-sm text-neutral-600'>{subtitle}</p>
    </div>
});

const ManageCookieModal = ({
    open,
    onClose,
    onAccept,
    onConfirm,
    onDelete
}) => {
    const [allowedCookies, setAllowedCookies] = useState(() => Object.fromEntries(Object.keys(CATEGORIES).map(key => ([CATEGORIES[key], true]))));

    const createOnToggle = useCallback((id) => () => {
        setAllowedCookies(prev => {
            const copy = { ...prev };
            copy[id] = !copy[id];
            return copy;
        });
    }, []);

    const handleAccept = () => {
        onAccept();
        onClose();
    }

    const handleDelete = () => {
        onDelete();
        onClose();
    }

    const handleConfirm = () => {
        onConfirm(allowedCookies);
        onClose();
    }

    const content = manageCookieContent.map(({ id, title, subtitle }) =>
        <ManageCookieItem key={id}
            title={title}
            subtitle={subtitle}
            isOn={allowedCookies[id]}
            onToggle={createOnToggle(id)}
            disabled={id === CATEGORIES.ESSENTIAL} />);

    const footer = (<div className='flex flex-col gap-2'>
        <div className='flex justify-between gap-2'>
            <Button type='primary' onClick={handleAccept} className='w-full'>Accept all</Button>
            <Button type='secondary' onClick={handleConfirm} className='w-full'>Save</Button>
        </div>
        <div>
            <Button type='tetiary' onClick={handleDelete} className='w-full'>Delete all</Button>
        </div>
    </div>)

    return <Modal open={open} content={content} footer={footer} onClose={onClose} className='max-w-[400px]' />
}

export default ManageCookieModal;