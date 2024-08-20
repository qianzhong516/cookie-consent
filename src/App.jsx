import { Button } from './Button';

const CookieConsentModal = () => {
  return (
    <div className='fixed bottom-0 w-full bg-white'>
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
          <Button type='tetiary' className='w-full md:w-auto'>Decline All</Button>
          <div className='flex flex-wrap gap-x-4 gap-y-2 w-full md:w-auto'>
            <Button type='primary' className='w-full md:w-auto'>Allow Cookies</Button>
            <Button type='secondary' className='w-full md:w-auto'>Manage Cookies</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className='w-full h-svh bg-gradient-to-br from-[#F9FAFB] to-[#D2D6DB]'>
      <CookieConsentModal />
    </div>
  );
}

export default App;
