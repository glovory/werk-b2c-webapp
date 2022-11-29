// import Skeleton from 'react-loading-skeleton';
// import FormLogin from '../modules/login/FormLogin';
// import Layout from '../components/layouts/Home/LayoutHome';
// import Image from 'next/image';
import LayoutMain from '../components/layouts/LayoutMain';
// import bgHero from '../public/image/bg/bg-hero.jpg';

export default function Home(){
  return (
    <LayoutMain>
      <main>
        {/* <Image
          priority
          className="w-100 object-cover"
          // width={1440}
          height={450}
          alt="Hero"
          // src="/image/bg/bg-hero.jpg"
          src={bgHero}
        /> */}

        <img
          className="w-100 object-cover"
          height={450}
          alt="Hero"
          src="/image/bg/bg-hero.jpg"
        />
      </main>
    </LayoutMain>
  );
}
