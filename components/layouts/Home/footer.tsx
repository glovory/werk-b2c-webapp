import React from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

// const SOCIALS = [
//   { name: "Tiktok", url: "", icon: "" },
// ];

const Footer = () => {
  return (
    <footer className="p-4 text-center bg-white text-black-50">
      <p className="pb-2">
        WERK is a tech company headquartered in Indonesia with a global footprint. We are a team of experience managing human capital professionals and passionate technologists who are committed to <br />
        creating the next-generation employee management platform. We take pride in our product and the value we create for our customers. We are constantly seeking improvements and aspire to be the <br />
        software partner that grows together with our customers!
      </p>

      <p>
        Copyright © 2022 Werk. All Rights Reserved.<br />
        {/*  link-dark */}
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
