import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { Menu, X } from 'react-feather';
import router from 'next/router';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Toggle from './toggle';

export default function SettingsMenu() {
  const { url } = useSelector((state: RootState) => state.progress);
  const [imperial, setImperial] = useState(false);

  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
  };

  const toAbout = () => {
    router.push(`/about`);
  };

  const openOriginal = () => {
    window.open(url, '_blank');
  };

  const share = () => {
    const shareData = {
      title: 'Try Better Recipes!',
      url: window.location.href,
    };
    if (navigator.share) {
      navigator.share(shareData).catch((err) => {
        console.error(err);
        addToClipboard();
      });
    } else {
      addToClipboard();
    }
  };

  const addToClipboard = () => {
    navigator.clipboard.writeText(url);
    toast('Link copied to clipboard!');
  };

  return (
    <>
      <button className='absolute top-2 left-4' onClick={toggle}>
        <Menu size={32} color='white' />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className='absolute w-3/4 md:w-1/3 lg:w-1/4 h-full top-0 bg-white border-r-4 border-better-blue'
            initial={{ left: '-75vw' }}
            animate={{ left: 0 }}
            exit={{ left: '-75vw' }}
            transition={{ type: 'spring', bounce: 0, mass: 0.1 }}
          >
            <div className='w-full h-10 text-right'>
              <button onClick={toggle}>
                <X className='m-2' size={32} />
              </button>
            </div>
            <div className='ml-6'>
              <h3 className='text-xl py-4'>Unit Conversions</h3>
              <ul>
                <li className='py-4'>
                  <Toggle
                    label='Use Imperial Units'
                    initial={imperial}
                    onChange={setImperial}
                  />
                </li>
                <li className='py-4'>
                  <Toggle
                    label='Use Imperial Units'
                    initial={imperial}
                    onChange={setImperial}
                  />
                </li>
                <li className='py-4'>
                  <Toggle
                    label='Use Imperial Units'
                    initial={imperial}
                    onChange={setImperial}
                  />
                </li>
                <li className='py-4'>
                  <Toggle
                    label='Use Imperial Units'
                    initial={imperial}
                    onChange={setImperial}
                  />
                </li>
              </ul>
              <h3 className='text-xl py-4'>Color Scheme</h3>
              <select>
                <option>Green</option>
                <option>Pink</option>
                <option>Blue</option>
                <option>Dark</option>
                <option>Light</option>
              </select>
              <h3 className='text-xl py-4'>Alarm Sound</h3>
              <select>
                <option>Andy</option>
                <option>Bells</option>
                <option>Cat</option>
              </select>
            </div>
            <div className='absolute bottom-4 w-full text-center text-gray-500 text-sm font-bold grid grid-cols-3'>
              <div className='col-span-1'>
                <button onClick={toAbout}>About</button>
              </div>
              <div className='col-span-1'>
                <button onClick={openOriginal}>Original</button>
              </div>
              <div className='col-span-1'>
                <button onClick={share}>Share</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
