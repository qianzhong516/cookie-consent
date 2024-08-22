import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';
import { useRef, } from 'react';
import { Transition, TransitionChild } from '@headlessui/react'
import useClickOutside from './hooks/useClickOutside';

export function ModalImpl({
    content,
    footer,
    className,
}) {
    const handleClick = (e) => {
        // prevent newly opened dialog from being closed
        e.stopPropagation()
    }

    return (
        <div className={twMerge('flex flex-col gap-6 p-4 pb-0 shadow-md bg-white rounded-md', className)} onClick={handleClick}>
            {content}
            <div className='sticky bottom-0 bg-white w-full pb-4'>
                {footer}
            </div>
        </div>
    );
}

const Backdrop = ({ children }) =>
    <div className='fixed inset-0 sm:flex sm:justify-center sm:items-center w-full h-svh bg-neutral-950/40 backdrop-blur-sm p-4'>{children}</div>;

export default function Modal({
    open,
    ...props
}) {
    const panelRef = useRef(null);
    const enabled = open;
    useClickOutside(enabled, panelRef.current ? [panelRef.current] : [], props.onClose);

    return open && createPortal(
        <Transition show={open} appear={true}>
            <TransitionChild
                enter="ease-in-out"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-out"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">
                <div className='transition duration-[250ms]'>
                    <Backdrop>
                        <TransitionChild
                            enter="ease-in-out"
                            enterFrom="scale-0"
                            enterTo="scale-100"
                            leave="ease-out"
                            leaveFrom="scale-100"
                            leaveTo="scale-0">
                            <div className='transition duration-[250ms]' ref={panelRef}>
                                <ModalImpl {...props} />
                            </div>
                        </TransitionChild>
                    </Backdrop>
                </div>
            </TransitionChild>
        </Transition>,
        document.body);
}