import Image from 'next/image';

export default function RecipeLoading() {
  return (
    <div
      style={{ top: 'calc(50% - 35px)', left: 'calc(50% - 35px)' }}
      className='animate-bounce absolute'
    >
      <Image
        alt='Bouncing fruit'
        src='/ingredients/chili-pepper.svg'
        width='70'
        height='70'
      />
    </div>
  );
}
