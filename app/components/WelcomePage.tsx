// import Image from "remix-image";
// import StartLayout from "~/components/StartLayout";
import LayoutLogged from "~/components/LayoutLogged";

const WelcomePage: React.FC = () => {
  return (
    <LayoutLogged footer={false}>
      <img
        loading="lazy"
        decoding="async"
        draggable={false}
        height={450}
        className="w-full object-cover"
        alt="Hero"
        src="/image/bg/bg-hero.jpg"
      />
    </LayoutLogged>
  );
}

export default WelcomePage;
