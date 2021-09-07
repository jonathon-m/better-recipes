import router from 'next/router';
import toast from 'react-hot-toast';

export default function Header(props: { recipeName: string; url: string }) {
  const toAbout = () => {
    router.push(`/about`);
  };

  const openOriginal = () => {
    window.open(props.url, '_blank');
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
    navigator.clipboard.writeText(props.url);
    toast('Link copied to clipboard!');
  };

  return (
    <div>
      <h1 className='bg-gradient-to-b from-better-green to-transparent md:p-4 md:text-center text-xl md:text-3xl md:text-5xl font-bold text-white '>
        {props.recipeName}
      </h1>
      <div className='md:text-center text-gray-500 text-sm'>
        <p>
          <button onClick={toAbout}>About Better Recipes</button>
        </p>
        <p>
          <button onClick={openOriginal}>Open Original</button>
        </p>
        <p>
          <button onClick={share}>Share</button>
        </p>
      </div>
    </div>
  );
}
