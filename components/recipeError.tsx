import { motion } from 'framer-motion';
import Image from 'next/image';
import BorderBox from './borderBox';

export default function RecipeError(props: { message?: string }) {
  return (
    <motion.div
      initial={{ x: '-25%', y: '-50%', opacity: 0 }}
      animate={{ x: '-50%', opacity: 1 }}
      className='max-w-md absolute top-1/2 left-1/2'
    >
      <BorderBox>
        <div className='flex justify-center -mt-20'>
          <Image
            alt='Result of recipe'
            width='70'
            height='70'
            src='/error.png'
          />
        </div>
        <div className='py-2 text-xl'>
          <h1>Oh no!</h1>
        </div>
        <div className='py-2'>
          <p>
            {props.message || 'Something went wrong when fetching your recipe.'}
          </p>
          <p>Hit back on your browser, and try again.</p>
        </div>
        <div className='py-4 text-gray-500 text-sm'>
          <p>
            If you think this should have worked, please
            <a
              className='underline hover:text-blue-400'
              target='_blank'
              href='www.google.com'
            >
              {' '}
              report a bug
            </a>
            .
          </p>
        </div>
      </BorderBox>
    </motion.div>
  );
}
