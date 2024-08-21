import { useState } from 'react';
import CookieConsentPopup from './CookieConsentPopup';

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
