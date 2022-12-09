import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

export default function NavMain(){
  const MENUS = Array.from({ length: 5 });

  const signWithGoogle = () => {
    window.open('', 'Sign in - Google Account', `left=${(screen.width - 496) / 2},top=${(screen.height - 574) / 4},width=496,height=574`);
  }

  return (
    <Navbar bg="white" expand="lg" sticky="top" className="shadow-sm">
      <Container>
        <Navbar.Brand
          as={Link}
          href="/"
        >
          <Image
            priority
            width={32}
            height={32}
            alt="Werk Logo"
            src="/image/werk-logo-symbol-space.svg"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navMain" />

        <Navbar.Collapse id="navMain">
          <Nav className="ms-auto">
            {MENUS.map((v, i) => 
              <Nav.Link key={i} as={Link} href="/">Menu {i + 1}</Nav.Link>
            )}

            <Nav.Link as={Link} href="/signup">Sign up</Nav.Link>

            <Navbar.Text className="py-0 ms-lg-4">
              Continue with
              <Button onClick={signWithGoogle} variant="light" size="sm" className="px-3 ms-4">
                <Image
                  priority
                  width={18}
                  height={18}
                  alt="Google Logo"
                  src="/image/brand/google.svg"
                />
              </Button>
              <Button variant="dark" size="sm" className="px-3 ms-3">
                <Image
                  priority
                  width={18}
                  height={18}
                  alt="Google Logo"
                  src="/image/brand/apple.svg"
                />
              </Button>
            </Navbar.Text>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
