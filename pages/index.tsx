import type { ReactElement } from 'react';
import LayoutMain from '../components/layouts/LayoutMain';

const Home = () => {
  return (
    <main>
      <img
        className="w-100 object-cover"
        height={450}
        alt="Hero"
        src="/image/bg/bg-hero.jpg"
      />
    </main>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutMain title="Werk">
      {page}
    </LayoutMain>
  )
}

export default Home;
