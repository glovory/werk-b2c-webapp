import LayoutMain from '../components/layouts/LayoutMain';

export default function Home(){
  return (
    <LayoutMain>
      <main>
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
