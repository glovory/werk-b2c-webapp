import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Cx } from '../../../utils/dom';

interface Props {
  className?: string,
}

const Footer = ({ className }: Props) => {
  return (
    <footer className={Cx("p-4 text-center text-black-50", className)}>
      <p>
        Copyright © 2022 Werk. All Rights Reserved.<br />
        Read <a href="/" className="fw-bold text-black-50 text-decoration-underline">About Us</a>, our <a href="/" className="fw-bold text-black-50 text-decoration-underline">Privacy Policy</a> and <a href="/" className="fw-bold text-black-50 text-decoration-underline">Terms of Service</a>.
      </p>

      <div className="nav justify-content-center">
        <a href="/" className="nav-link d-grid place-items-center">
          <img src="/image/brand/tiktok.svg" alt="tiktok" />
        </a>
        <a href="/" className="nav-link">
          <YouTubeIcon fontSize="large" />
        </a>
        <a href="/" className="nav-link">
          <InstagramIcon fontSize="large" />
        </a>
        <a href="/" className="nav-link">
          <FacebookIcon fontSize="large" />
        </a>
        <a href="/" className="nav-link">
          <TwitterIcon fontSize="large" />
        </a>
        <a href="/" className="nav-link">
          <LinkedInIcon fontSize="large" />
        </a>
      </div>
    </footer>
  )
}

export default Footer;
