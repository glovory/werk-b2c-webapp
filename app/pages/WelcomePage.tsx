// import Image from "remix-image";
//
import LayoutLogged from "~/components/LayoutLogged";
// import Img from "~/components/Img";
// import { imgLoader } from '~/utils/dom';

const WelcomePage: React.FC = () => {
  return (
    <LayoutLogged footer={false}>
      {/* <Img
        className="w-full object-cover"
        height={450}
        alt="Hero"
        src="/image/bg/bg-hero.jpg"
      /> */}

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
