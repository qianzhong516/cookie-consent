import Modal from './Modal';
import { memo, useCallback, useState } from 'react';
import Button from './Button';
import ToggleSlider from './ToggleSlider';

const manageCookieContent = [
    { title: 'Essentials', subtitle: 'These cookies are essential for the proper functioning of our services and cannot be disabled.' },
    { title: 'Analytics', subtitle: 'These cookies collect information about how you use our services or potential errors you encounter. Based on this information we are able to improve your experience and react to any issues.' },
    { title: 'Marketing', subtitle: 'These cookies allow us to show you advertisements relevant to you through our advertising partners.' },
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
    const [allowedCookies, setAllowedCookies] = useState([true, true, true]);

    const createOnToggle = useCallback((i) => () => {
        setAllowedCookies(prev => {
            const copy = [...prev];
            copy[i] = !copy[i];
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

    const content = manageCookieContent.map(({ title, subtitle }, i) =>
        <ManageCookieItem key={i}
            title={title}
            subtitle={subtitle}
            isOn={allowedCookies[i]}
            onToggle={createOnToggle(i)}
            disabled={i === 0} />);

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