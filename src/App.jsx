import { useCallback, useState } from 'react';
import Button from './Button';
import ManageCookieModal from './ManageCookiesModal';

const CookieConsentPopup = ({
  open,
  onClose,
  onDecline,
  onAllow,
  onConfirm
}) => {
  const [subDialogOpen, setSubDialogOpen] = useState(false);

  const onManageCookies = useCallback(() => setSubDialogOpen(true), []);
  const onCloseSubDialog = useCallback(() => setSubDialogOpen(false), []);

  const onDeclineAll = () => {
    onDecline();
    onClose();
  }

  const onAllowAll = () => {
    onAllow();
    onClose();
  }

  return open && (
    <>
      <div className='fixed bottom-0 w-full bg-white' onClick={(e) => {
        // This is a hack to prevent the subdialog from being closed immediately once it's opened.
        // (Fix)TODO: pass in the pop-up as one of the containers, so it's disregarded as being 'outside'. see `useClickOutside`.
        e.stopPropagation();
      }}>
        <div className='container flex flex-col gap-4 w-full py-6 lg:max-w-[1280px]'>
          <div className='flex flex-col gap-1'>
            <h1 className='text-md font-semibold text-neutral-900'>
              We use cookies
            </h1>
            <p className='text-sm text-neutral-600'>
              We use cookies to enhance your browsing experience and
              improve our website&apos;s performance. By continuing to use
              this site, you consent to the use of cookies. To learn more
              about how we use cookies and your options, please read our{' '}
              <a
                className='text-indigo-700'
                href='/'
                onClick={(e) => e.preventDefault()}>
                cookie policy.
              </a>
            </p>
          </div>
          <div className='flex flex-wrap-reverse justify-between gap-y-2'>
            <Button type='tetiary' className='w-full md:w-auto' onClick={onDeclineAll}>Decline All</Button>
            <div className='flex flex-wrap gap-x-4 gap-y-2 w-full md:w-auto'>
              <Button type='primary' className='w-full md:w-auto' onClick={onAllowAll}>Allow Cookies</Button>
              <Button type='secondary' className='w-full md:w-auto' onClick={onManageCookies}>Manage Cookies</Button>
            </div>
          </div>
        </div>
      </div>
      <ManageCookieModal open={subDialogOpen} onClose={onCloseSubDialog} onAccept={onAllow} onConfirm={onConfirm} onDelete={onDecline} />
    </>
  );
};

function App() {
  // TODO: if have seen this popup before, do not show it.

  const [isOpen, setIsOpen] = useState(true);

  const onDeclineAll = () => { console.log('onDeclineAll') }
  const onAllowAll = () => { console.log('onAllowAll') }
  const onConfirm = (categories) => { console.log(categories) }

  return (
    <div className='w-full h-svh bg-gradient-to-br from-[#F9FAFB] to-[#D2D6DB]'>
      <CookieConsentPopup open={isOpen} onClose={() => setIsOpen(false)}
        onDecline={onDeclineAll}
        onAllow={onAllowAll}
        onConfirm={onConfirm} />
    </div>
  );
}

export default App;
