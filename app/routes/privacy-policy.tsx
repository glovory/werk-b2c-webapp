import Container from '@mui/material/Container';
import { Link } from "react-router-dom";
import WelcomeLayout from "~/components/WelcomeLayout";

const PrivacyPolicy: React.FC = () => {
  const DATAS: any = [
    {
      id: "I",
      title: "Information We Collect",
    },
    {
      id: "II",
      title: "Your Information that We Use on Other Website",
    },
    {
      id: "III",
      title: "Cookies Use and Website Statistic",
    },
    {
      id: "IV",
      title: "Changing or Deleting Your Data",
    },
    {
      id: "V",
      title: "Confidentiality",
    },
    {
      id: "VI",
      title: "Disclosure of Data",
    },
    {
      id: "VII",
      title: "Privacy Policy Changes",
    },
  ];

  const clickList = (e: any, id: string) => {
    e.stopPropagation(); // preventDefault
    const section = document.getElementById(id)?.getBoundingClientRect();
    if(section){
      setTimeout(() => {
        window.scrollTo({
          top: section.top - 65,
          behavior: 'smooth'
        });
      }, 9);
    }
  }

  return (
    <WelcomeLayout>
      <Container className="pt-8 pb-16">
        <h1 className="h4 text-center mb-5">Privacy Policy</h1>

        <nav className="flex flex-col items-start mb-5">
          {DATAS.map((item: any) => 
            <Link
              key={item.id}
              to={'#' + item.id}
              onClick={(e) => clickList(e, item.id)}
              className="inline-flex font-medium text-sm mb-2"
            >
              {item.id}. {item.title}
            </Link>
          )}
        </nav>

        <p>
          <strong>PT Werk Technologies Fantastik (WTF)</strong> created a privacy policy to reflect Our commitment to protecting Your privacy. As a service provider, We maintain the confidentiality and security of Your data. We store and manage a variety of your personal, organizational and financial information for service purposes to match Talents with companies that need Talents.
        </p>

        <section id="I" className="mt-5">
          <h3 className="h5">I. Information We Collect</h3>
          <p>
            The information We collect includes information related to the User activities using the Service. Your information and/or data are only used for purposes of using this Werk service.  By using this Service, you guarantee that you are responsible and give your consent that we collect and manage your personal information and/or data properly and keep it confidential..
          </p>
        </section>

        <section id="II" className="mt-5">
          <h3 className="h5">II. Your Information that We Use on Other Website</h3>
          <p>
            By using Werk Services, You can enjoy various benefits through the platform that is connected to Wek. in the event that You decide to use the service on an Affiliated Platform. We share Your data with the Affiliated Platform so that You can use the Affiliated Platform comfortably without the need to input your personal data. You don't need to worry because we always choose an Affiliated Platform that uses the same data security and confidentiality standards that Werk applies. We will continue to monitor and supervise the security and confidentiality of your data while using this Affiliated Platform facility. You just have to log in with your Werk personnel account and enjoy the benefits you need.
          </p>
        </section>

        <section id="III" className="mt-5">
          <h3 className="h5">III. Cookies Use and Website Statistic</h3>
          <p>
            We use infrastructure to improve the website’s user experience and to track website users, including cookies. Cookies are small parts of text in a website placed on Your computer to help in memorizing information on Your visit. Cookies cannot read data available on Your computer hardware or seize Your personal information. We use information attained from cookies to enhance Your user experience and Our service quality in general. Our cookies may also be provided by the third-party service provider who is authorized to embed cookies infrastructure in Our Website.
            <br />
            We collect user statistics to measure performance, security, and lesson learned for Our Website development. User statistic comprises of summary of traffic to Our Website. Example of data We obtain from user statistic is the number of page views, number of visits, number of moving data, etc.
          </p>
        </section>

        <section id="IV" className="mt-5">
          <h3 className="h5">IV. Changing or Deleting Your Data</h3>
          <p>
            All users of the Werk Website and Werk Apps can review, update, or correct the personal information contained on Our Website and Application.
            <br />
            Werk account cannot be deleted right away after the User’s Service Period has ended or when the User decides to terminate the subscription. It is not possible to delete the Werk account immediately at the end of the Service Period to keep data safe and maintain service stability. In the event that the Werk Service Period ends, data will automatically be inaccessible to the user. Your data will be deleted from Our database after 15 (fifteen) calendar days from the end of the Service Period if Service Period is not extended.
          </p>
        </section>

        <section id="V" className="mt-5">
          <h3 className="h5">V. Confidentiality</h3>
          <p>
          Our Website and application are equipped with Security Socket Layer (SSL) data security protocol). You and we can access Your employee's personal data and information. Both of us must jointly maintain and ensure to maintain the confidentiality of data, documents, and/or information available during the use of this service, whether the information comes from You or from Our services. Any disclosure of confidentiality that will be made by You or us must obtain and submit written consent from disclosing party unless otherwise required by law or court order.
          </p>
        </section>

        <section id="VI" className="mt-5">
          <h3 className="h5">VI. Disclosure of Data</h3>
          <p>
            We will not disclose, share, sell and/or use Your personal information without Your consent or instructions, except for or for legal purposes and purposes.
            <br />
            We may store and have the right to disclose information or data about You or site users by You without Your prior consent if such action is required to:
          </p>
          <ol className="list-lower-alpha pl-4">
            <li>
              to protect and defend the rights, proprietorship, and safety of Ours, the Website user, or the public;
            </li>
            <li>
              to implement terms and conditions which prevail on this Website usage;
            </li>
            <li>
              to respond claim which alleges that there is content infringing other third party's rights;
            </li>
            <li>
              to respond claim concerning the occurrence of activity that is alleged or is against the law;
            </li>
            <li>
              to respond to audits or investigate security complaints or threat and/or
            </li>
            <li>
              comply with prevailing laws and regulations, legal procedures, or governments or other law enforcement institutions' orders.
            </li>
          </ol>
        </section>

        <section id="VII" className="mt-5">
          <h3 className="h5">VII. Privacy Policy Changes</h3>
          <p>
            We have the right to change, modify, add or remove portions of this Privacy Policy at any time. If You continue to use Our Werk Website and Werk Application after a change of this privacy policy, it means that You accept the changes.
          </p>
        </section>
      </Container>
    </WelcomeLayout>
  );
}

export default PrivacyPolicy;
