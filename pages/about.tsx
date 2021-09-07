import BorderBox from '../components/borderBox';

export default function AboutPage() {
  return (
    <div className='bg-apple-pattern bg-8 md:bg-16 md:p-10'>
      <BorderBox>
        <h1 className='text-xl'>About</h1>
        <p>
          Currently recipes online come in broadly 2 formats:
          <ul>
            <li>A blog with a recipe hidden in it.</li>
            <li>
              A cramped collection of tabs for ingredients and instructions.
            </li>
          </ul>
          Both of these have the same problem - they&apos;re hard to use while
          actually cooking.
        </p>
        <p>
          In the moments between perfect and burnt garlic, the last thing you
          need is to be scanning a tiny web page looking for how much oregano to
          add. Sure, in an ideal world you would have measured everything before
          you started cooking, but who has that much time, or that many tiny
          bowls? The goal <b>Better Recipes</b> is to give the internet a better
          way to show recipes, reflecting how they&apos;re actually used. To
          give you all the information you need, when you need it.
        </p>
        <p>
          This is still a work in progress, and not every recipes is going to
          work perfectly. If you have any feedback, or spot any bugs, please
          click here.
        </p>
        <h2 className='text-lg'>Supported Websites</h2>
        <p>
          Better Recipes leverages{' '}
          <a href='https://github.com/jadkins89/Recipe-Scraper'>
            Recipe Scraper
          </a>{' '}
          to load recipe data. Currently only the following websites are fully
          supported:
        </p>
        <ul>
          <li>https://www.101cookbooks.com/</li>
          <li>https://www.allrecipes.com/</li>
          <li>https://www.ambitiouskitchen.com/</li>
          <li>https://www.averiecooks.com/</li>
          <li>https://www.bbc.co.uk/</li>
          <li>https://www.bbcgoodfood.com/</li>
          <li>https://www.bonappetit.com/</li>
          <li>https://www.budgetbytes.com/</li>
          <li>https://www.centraltexasfoodbank.org/</li>
          <li>https://www.closetcooking.com/</li>
          <li>https://cookieandkate.com/</li>
          <li>https://copykat.com/</li>
          <li>https://damndelicious.net/</li>
          <li>https://www.eatingwell.com/</li>
          <li>https://www.epicurious.com/</li>
          <li>https://www.food.com/</li>
          <li>https://www.foodandwine.com/</li>
          <li>https://www.foodnetwork.com/</li>
          <li>https://gimmedelicious.com/</li>
          <li>https://www.gimmesomeoven.com/</li>
          <li>https://julieblanner.com/</li>
          <li>https://www.kitchenstories.com/</li>
          <li>https://www.melskitchencafe.com/</li>
          <li>https://www.minimalistbaker.com/</li>
          <li>https://www.myrecipes.com/</li>
          <li>https://www.nomnompaleo.com/</li>
          <li>https://www.omnivorescookbook.com/</li>
          <li>https://pinchofyum.com/</li>
          <li>https://recipetineats.com/</li>
          <li>https://www.seriouseats.com/</li>
          <li>https://www.simplyrecipes.com/</li>
          <li>https://smittenkitchen.com/</li>
          <li>https://thepioneerwoman.com/</li>
          <li>https://www.tasteofhome.com/</li>
          <li>https://tastesbetterfromscratch.com/</li>
          <li>https://thatlowcarblife.com/</li>
          <li>https://www.theblackpeppercorn.com/</li>
          <li>https://therealfoodrds.com/</li>
          <li>https://www.thespruceeats.com/</li>
          <li>https://whatsgabycooking.com/</li>
          <li>https://www.woolworths.com.au/</li>
          <li>https://www.yummly.com/</li>
          <li>https://www.jamieoliver.com/</li>
        </ul>
      </BorderBox>
    </div>
  );
}
