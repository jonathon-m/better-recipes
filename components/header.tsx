export default function Header(props: { recipeName: string }) {
  return (
    <div className='w-full text-center'>
      <h1 className='p-4 pb-1 pt-2 text-center text-2xl md:text-3xl md:text-5xl font-bold text-white '>
        {props.recipeName}
      </h1>
    </div>
  );
}
