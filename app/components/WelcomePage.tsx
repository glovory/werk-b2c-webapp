// import { useEffect } from "react";
// import Image from "remix-image";
// import StartLayout from "~/components/StartLayout";
// import { useAppContext } from '~/contexts/AppContext';
import LayoutLogged from "~/components/LayoutLogged";
// import { imgLoader } from '~/utils/dom';

const WelcomePage: React.FC = () => {
  // const ENV = useAppContext();
  // console.log('ENV: ', ENV);

  // useEffect(() => {
  //   console.log('useEffect APPWRITE_URL: ', APPWRITE_URL);
  // }, [APPWRITE_URL]);

  return (
    <LayoutLogged footer={false}>
      <img
        // {...imgLoader("w-full object-cover")}
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
