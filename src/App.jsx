import { useState } from 'react';
import CookieConsentPopup from './CookieConsentPopup';
import Storage from './utils/storage';
import { CATEGORIES } from './constants'

const STORAGE_KEY = 'cookiePreference';

function App() {
  const hasPreference = Storage.getItem(STORAGE_KEY);
  const [isOpen, setIsOpen] = useState(!hasPreference);

  const onDeclineAll = () => {
    const value = {};
    Object.keys(CATEGORIES).forEach(key => {
      if (key !== CATEGORIES.ESSENTIAL) {
        value[CATEGORIES[key]] = false;
      }
    });
    Storage.setItem(STORAGE_KEY, value);
  }
  const onAllowAll = () => {
    const value = {};
    Object.keys(CATEGORIES).forEach(key => {
      value[CATEGORIES[key]] = true;
    });
    Storage.setItem(STORAGE_KEY, value);
  }
  const onConfirm = (categories) => {
    Storage.setItem(STORAGE_KEY, categories);
  }

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
