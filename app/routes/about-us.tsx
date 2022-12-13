import Container from '@mui/material/Container';
import WelcomeLayout from "~/components/WelcomeLayout";

const AboutUs: React.FC = () => {
  return (
    <WelcomeLayout>
      <Container className="pt-8 pb-16">
        <h1 className="h4 text-center mb-5">About Us</h1>
        <p>
          WERK is a tech company headquartered in Indonesia with a global footprint. We are a team of experience managing human capital professionals and passionate technologists who are committed to creating the next-generation employee management platform. We take pride in our product and the value we create for our customers. We are constantly seeking improvements and aspire to be the software partner that grows together with our customers!
        </p>
      </Container>
    </WelcomeLayout>
  );
}

export default AboutUs;
