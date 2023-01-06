import { Link } from "@remix-run/react";
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Cx } from '~/utils/dom';

interface FooterMainProps {
  className?: string,
}

const FooterMain = ({ className }: FooterMainProps) => {
  return (
    <footer className={Cx("p-4 text-center mt-auto", className)}>
      <p className="mb-4 text-xs">
        Copyright © 2022 Werk. All Rights Reserved.<br />
        Read <Link to="/about-us" className="font-bold underline text-gray-600">About Us</Link>, our <Link to="/privacy" className="font-bold underline text-gray-600">Privacy Policy</Link> and <Link to="/terms" className="font-bold underline text-gray-600">Terms of Service</Link>.
      </p>

      <div className="flex flex-wrap justify-center items-center">
        <a href="/" rel="noopener noreferrer" target="_blank" className="block px-2">
          <img src="/image/brand/tiktok.svg" alt="tiktok" className="align-baseline" />
        </a>
        <a href="/" rel="noopener noreferrer" target="_blank" className="block px-2 text-gray-500">
          <YouTubeIcon />
        </a>
        <a href="/" rel="noopener noreferrer" target="_blank" className="block px-2 text-gray-500">
          <InstagramIcon />
        </a>
        <a href="/" rel="noopener noreferrer" target="_blank" className="block px-2 text-gray-500">
          <FacebookIcon />
        </a>
        <a href="/" rel="noopener noreferrer" target="_blank" className="block px-2 text-gray-500">
          <TwitterIcon />
        </a>
        <a href="/" rel="noopener noreferrer" target="_blank" className="block px-2 text-gray-500">
          <LinkedInIcon />
        </a>
      </div>
    </footer>
  )
}

export default FooterMain;
