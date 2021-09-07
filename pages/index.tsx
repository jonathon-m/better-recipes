import { useRouter } from 'next/router';
import SearchBar from '../components/searchbar';
import { motion } from 'framer-motion';

export default function Home() {
  const router = useRouter();

  const onUrlSubmit = (url: string) => {
    router.push(`/recipe/${encodeURIComponent(url)}`);
  };

  return (
    <div className='bg-apple-pattern bg-8 md:bg-16 w-screen h-screen grid place-items-center'>
      <motion.div
        initial={{ x: 200 }}
        animate={{ x: 0 }}
        className='max-w-md py-12 px-12 bg-white rounded-lg ring-2 ring-better-green'
      >
        <h1 className='text-center text-3xl md:text-5xl font-bold m-4 md:m-6'>
          Better Recipe
        </h1>
        <SearchBar search={onUrlSubmit}></SearchBar>
      </motion.div>
    </div>
  );
}
