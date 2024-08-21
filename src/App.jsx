import { useEffect, useState } from 'react';
import CookieConsentPopup from './CookieConsentPopup';
import Storage from './utils/storage';
import { CATEGORIES, CATEGORY_FILE_MAPPING } from './constants'

const STORAGE_KEY = 'cookiePreference';

const loadScripts = (obj) => {
  if (!obj) return;
  Object.keys(obj).forEach(key => {
    if (obj[key]) {
      addScript(key, CATEGORY_FILE_MAPPING[key]);
    }
  });
}

function addScript(key, src) {
  const scripts = document.querySelectorAll('script');
  if (scripts && Array.from(scripts).some(script => script.id === key)) {
    return;
  }
  const script = document.createElement('script');
  script.id = key;
  script.src = src;
  document.head.appendChild(script);
}

function App() {
  const [isOpen, setIsOpen] = useState(!Storage.getItem(STORAGE_KEY));

  useEffect(() => {
    loadScripts(Storage.getItem(STORAGE_KEY));
  }, []);

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
    loadScripts(value);
  }
  const onConfirm = (obj) => {
    // TODO: use document.cookie to save the consents instead, so there can be a time limit
    Storage.setItem(STORAGE_KEY, obj);
    loadScripts(obj);
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
