import LayoutLogged from "~/components/LayoutLogged";

const WelcomePage: React.FC = () => {
  return (
    <LayoutLogged footer={false}>
      <img
        className="w-full object-cover"
        loading="lazy"
        decoding="async"
        draggable={false}
        height={450}
        alt="Hero"
        src="/image/bg/bg-hero.jpg"
      />
    </LayoutLogged>
  );
}

export default WelcomePage;
