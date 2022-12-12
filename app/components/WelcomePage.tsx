import StartLayout from "~/components/StartLayout";

const WelcomePage: React.FC = () => {
  return (
    <StartLayout>
      <img
        loading="lazy"
        decoding="async"
        draggable={false}
        height={450}
        className="w-full object-cover"
        alt="Hero"
        src="/image/bg/bg-hero.jpg"
      />
    </StartLayout>
  );
}

export default WelcomePage;
