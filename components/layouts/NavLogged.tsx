import Link from 'next/link';
import Image from 'next/image';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';

export default function NavLogged(){
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

        <Navbar.Toggle aria-controls="navMainLog" />

        <Navbar.Collapse id="navMainLog">
          <Nav className="ms-auto">
            <Dropdown
              drop="down"
              align={{ sm: 'end' }}
              className="nav-item"
            >
              <Dropdown.Toggle bsPrefix="p-0 rounded-circle border-0 bg-transparent" id="userNavMenuMain">
                <img
                  className="rounded-circle object-cover"
                  width={32}
                  height={32}
                  alt="User"
                  src="/image/misc/user_1.png"
                />
              </Dropdown.Toggle>
              <Dropdown.Menu className="shadow-sm">
                <Dropdown.Item href="#/">
                  <b>John Doe</b>
                  <div className="small">johndoe21@gmail.com</div>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#/">
                  <SettingsTwoToneIcon className="me-2" />Setting
                </Dropdown.Item>
                <Dropdown.Item href="#/">
                  <LogoutTwoToneIcon className="me-2" />Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
