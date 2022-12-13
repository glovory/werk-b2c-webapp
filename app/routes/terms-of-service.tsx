import Container from '@mui/material/Container';
import { Link } from "react-router-dom";
import WelcomeLayout from "~/components/WelcomeLayout";

const TermsOfService: React.FC = () => {
  const DATAS: any = [
    {
      id: "I",
      title: "General Information",
    },
    {
      id: "II",
      title: "Approval",
    },
    {
      id: "III",
      title: "Service and Application Use",
    },
    {
      id: "IV",
      title: "Trial Service",
    },
    {
      id: "V",
      title: "User's Responbilities",
    },
    {
      id: "VI",
      title: "Service Cessation",
    },
    {
      id: "VII",
      title: "Service Level Agreement",
    },
    {
      id: "IX",
      title: "Relationship With Thirdparty",
    },
    {
      id: "X",
      title: "Electronic Transmission",
    },
    {
      id: "XI",
      title: "Force Majure",
    },
    {
      id: "XII",
      title: "Dispute Settlement",
    },
    {
      id: "XIII",
      title: "Miscellaneous",
    },
    {
      id: "XIV",
      title: "Applicable Document",
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
        <h1 className="h4 text-center mb-5">Terms of Service</h1>

        <nav className="flex flex-col items-start mb-5">
          {DATAS.map((item: any) => 
            <Link
              key={item.id}
              // replace
              to={'#' + item.id}
              onClick={(e) => clickList(e, item.id)}
              className="inline-flex font-medium text-sm mb-2"
            >
              {item.id}. {item.title}
            </Link>
          )}
        </nav>

        <p className="mb-4">
          Thank you for using Werk Talent. Before accessing and/or using the Services available in Werk, make sure You thoroughly and carefully read the Terms and Conditions of Werk Website and Service Use ("Terms and Conditions") on this page.
        </p>
        <p className="mb-4">
          By accessing and/or using the Services available on Werk Website and/or application, You agree that You have read, understood, accepted, and approved as well as been legally bound to these Terms and Conditions and other documents related to that. If You do not approve these Terms and Conditions, do not access the Website and use Werk's Services.
        </p>
        <p className="mb-4">
          Terms and Condition in this document describe and sets out materials that control and regulate legal relations between Service and Werk application provider and You or the User as a Werk user.
        </p>
        <p className="mb-4">
          You shall read these Terms and Conditions carefully and are neither obligated to accept these Terms and Conditions nor sign up/in, access, or use the Services unless You agree with these Terms and Conditions.
        </p>

        <section id="I" className="mt-5">
          <h3 className="h5">I. General Information</h3>
          <ol className="pl-4 mt-0">
            <li>
              Werk is an online software as an end-to-end human resource service (software as a service) to help the business entity in organizing human resources.
            </li>
            <li>
              Service Provider is PT Werk Technologies Super (WTS) as Werk service provider for new and extensions Users as well as the owner of www.werk.id ("Werk  Website"); 
            </li>
            <li>
              Werk Website is a platform that can be used and accessed by the User for using the Service, comprising all end-to-end Human Capital Services.
            </li>
            <li>
              Werk for Talent is a Talent Discovery service from Werk aimed at users who are looking for work through the services and features offered by Werk.
            </li>
            <li>
              You or the user shall mean the user of Werk and Service to the extent it conforms with context, comprising of:
              <ol className="list-lower-alpha">
                <li>
                  Every person who opens and/or accesses Werk Website;
                </li>
                <li>
                  The company, viz. a business entity that registers/signs up to Werk; or
                </li>
                <li>
                  Employee, viz. labor who is registered by Company to participate in Werk.
                </li>
              </ol>
            </li>
            <li>
              The Package available in Werk will be provided based on the availabilities of features chosen by the user.
            </li>
            <li>
              Intellectual Property Rights include but are not limited to copyrights and trademarks, either registered or not registered.
            </li>
            <li>
              Work Time is the day on Service Provider carries on its operational activities, viz. Monday until Friday, except national/public holidays, from 08.00-17.00 Indonesian Western Time.
            </li>
            <li>
              An invoice is a document that writes down the amount of money that must be paid by the User for the use of Werk's paid services chosen by the user.
            </li>
            <li>
              Data is information that shall be given by the User to Werk in forms that are provided in the Website and/or Application, by which every truth of the information that is given is the User's responsibility.
            </li>
          </ol>
        </section>

        <section id="II" className="mt-5">
          <h3 className="h5">II. Approval</h3>
          <ol className="pl-4 mt-0">
            <li>
              Hereby, You state and warrant whereas:
              <ol className="list-lower-alpha">
                <li>
                  You have read and agreed to our Terms and Condition, Privacy Policy, and Cost Terms;
                </li>
                <li>
                  You will use and/or access Our Werk Website, Services, and User Content only for valid purposes;
                </li>
                <li>
                  No materials whatsoever distributed through Your account or uploaded or shared by You through Werk Website, Service, and/or Service support application will violate or infringe any third party's right, including copyrights, trademarks, privacy, property, or any other personal rights; or encompasses slander, defamation or materials which are against the law;
                </li>
                <li>
                  All information that You give to Service Provider (including but not limited to personal and contact information data) is accurate and complete;
                </li>
                <li>
                  Service Provider is entitled to change, modify, postpone or cease whole or a part of Werk Website or Service or application at any time. Service Providers can also determine limits on particular features or restrict Your access based on the Service Provider's internal decision or rules relevant to the implementation of Werk and Service; and
                </li>
                <li>
                  Service Provider from time to time, without giving reasons or notifications of any kind before, can update, change, postpone, cease and/or end all content in Werk Website and/or Werk application, wholly or partially, including but not limited to design, text, graphic pictures, photo, drawings, image, video, application, music, sound and another file, tariff, fees, quotation, historical data, graphic, statistic, articles, our contact information, every other information and the choice and settings thereof.
                </li>
              </ol>
            </li>
            <li>
              You hereby state and warrant that:
              <ol className="list-lower-alpha">
                <li>
                  You are responsible for creating all needed settings in order to have access to Werk. You are also responsible for confirming that everybody who accesses Werk through Your internet connection acknowledges and complies with these Terms and Conditions and other prevailing provisions.
                </li>
                <li>
                  Internet may undergo disturbance, transmission shut-down, transmission delay due to internet traffic, or error data transmission as those circumstances attribute to opening the internet publicly.
                </li>
              </ol>
            </li>
          </ol>
        </section>

        <section id="III" className="mt-5">
          <h3 className="h5">III. Service and Application Use</h3>
          <p className="mb-3">By continuing to use or access Werk, it shall mean You have stated and warranted Service Provider whereas:</p>
          <ol className="pl-4 mt-0">
            <li>
              You are only allowed to access and/or use Werk for user needs in accordance with the functions and features offered by Werk. Access to and use of the Werk Website other than for user purposes is prohibited, and violates these Terms and Conditions unless such commercial activity has the consent of Werk.
            </li>
            <li>
              You are not allowed to use Werk for the following matters:
              <ol className="list-lower-alpha">
                <li>
                  to hurt, torture, humiliate, libel, defile a good name of, threaten, intimidate or disturb another person or business, anything which infringes privacy or what Service Provider deems full of hatred, indecent, improper, inappropriate, or discriminative;
                </li>
                <li>
                  by the way that is against the law, deceive, or with and/or commercial purpose;
                </li>
                <li>
                  violate or infringe another person's rights, including but not limited to patent rights, trademarks, copyrights, trade secrets, publicity, and other property rights;
                </li>
                <li>
                  create, examine, renew, change or fix a database, record, or directory of Yours or someone else's;
                </li>
                <li>
                  use automatic computer code, screen scraping system or process, robot program, net crawler, spider, data processing, trawling, or computer code; and/or
                </li>
                <li>
                  violate Terms and Conditions or other provisions available on Werk.
                </li>
              </ol>
            </li>
            <li>
              Service Provider is not responsible for loss due to failure in accessing Werk or method of using Werk that is beyond our control.
            </li>
            <li>
              Service Provider is not responsible nor can be blamed for loss or damage which is out of Your estimation at the time You access or use Werk. Loss includes expected cost-saving loss, loss of business or business opportunity, loss of income or profits, or any loss or damage which You undergo due to the use of Werk.
            </li>
          </ol>
        </section>

        <section id="IV" className="mt-5">
          <h3 className="h5">IV. Trial Service</h3>
          <ol className="pl-4 mt-0">
            <li>
              The User may get a free trial for Werk access (“<strong>Trial Service</strong>”) for a determined period. A trial Service is given to the User that is approved by Service Provider. This Trial Service is given with the purpose of helping the User to make a decision on whether to subscribe to Werk or not.
            </li>
            <li>
              At the latest 5 (five) days before the time period of Trial Service is over, Service Provider will send out an Initial Service Invoice to the User as a form of offering for the User to be Werk's subscribing User. If the User pays the bill, it shall mean the User has agreed to become subscribing User and to be subject to these Terms and Conditions.
            </li>
          </ol>
        </section>

        <section id="V" className="mt-5">
          <h3 className="h5">V. User's Responbilities</h3>
          <ol className="pl-4 mt-0">
            <li>
              Service Payment Obligation
              <ol className="list-lower-alpha">
                <li>
                  An invoice for the Werk service fee will be made every early subscription period.
                </li>
                <li>
                  The User is obligated to pay all fees charged by referring to terms concerning fees as available on Werk Website through the bank appointed by Werk.
                </li>
                <li>
                  Payment schemes that must be paid by the User depend on the dealing of the Company with Werk's Agent.
                </li>
              </ol>
            </li>
            <li>
              User's obligations to respect Werk's Intellectual Property Rights;<br />
              All Intellectual Property Rights within Werk are owned by Service Provider. All information and material, including but not limited to: Application, text, data,  graphics, image, trademark, logo, icon, HTML code, and another code in Werk Website and Werk application, is prohibited from being publicized, modified,  copied, reproduced, doubled or changed by any way without written approval from Service Provider. If the User violates those rights, Service Provider has the  right to make a civil lawsuit for the whole number of damage or loss suffered. These violations can also be criminal acts as regulated by prevailing laws and regulations.
            </li>
            <li>
              Compensation<br />
              User agrees to compensate Service Provider and its officers for all loss, taxes, fees, legal expenses, and obligations (which exist at present time, future time,  contingency, or anything based on compensation), suffered by Service Provider as a result of or in relation with violations of this Terms and Condition or other  related documents conducted by User and/or for measures taken by Service Provider at the time of the violation of this Terms and Condition or another relevant document.
            </li>
          </ol>
        </section>

        <section id="VI" className="mt-5">
          <h3 className="h5">VI. Service Cessation</h3>
          <ol className="pl-4 mt-0">
            <li>
              Service Provider can cease delivering Service and Werk access to User or terminate Cooperation Agreement with User on the basis, among others, as follows:
              <ol className="list-lower-alpha">
                <li>
                  User violates a part of or all contents of this Terms and Condition; and/or
                </li>
                <li>
                  User breaches a part of all Cooperation Agreements.
                </li>
              </ol>
            </li>
            <li>
              User may cease using the Service and Werk application by delivering a letter of Service termination sent to Werk at the email address: business@werk.id
            </li>
            <li>
              If Service Provider ceases the Service or closes Werk access to the User because the User does not pay Werk Service Fee in the amount of quota after the invoice is overdue, the User's account status will be:
              <ol className="list-lower-alpha">
                <li>
                  Not active.<br />
                  The status is given by Service Provider if the User does not pay Werk Service extension after 10 (ten) until 30 (Thirty) calendar days from the overdue date. After the User does not pay more than 10 (ten) days after the overdue date, the User can still access its account but is not able to use all available paid features. But, if between 10 (ten) days to 30 (thirty) days User pays its extension payment, the User can use the features again.
                </li>
                <li>
                  Unsubscribe.<br />
                  Status is given by the Service Provider if the User does not pay for the Werk Service extension after the due date of 30 (Thirty) calendar days. After the user does not pay more than 30 (thirty) calendar days from the due date, the user will lose access to the paid features offered by Werk.
                </li>
              </ol>
            </li>
            <li>
              If after the Werk use time period is over User still has funds deposited in the User's account, therefore the fund will be returned no later than 14 (Fourteen) working days from Werk use's end date.
            </li>
            <li>
              If the User still has fund deposited in the User's account after the User cease using Werk or the User terminates the Cooperation Agreement or the Service is ceased by Service Provider due to reasons mentioned in Chapter VI.1. Therefore, the User will not earn the fund back (no-refund).
            </li>
          </ol>
        </section>

        <section id="VII" className="mt-5">
          <h3 className="h5">VII. Service Level Agreement</h3>
          <ol className="pl-4 mt-0">
            <li>
              Service Availability Target<br />
              Service Provider gives warranty in relation to Werk server uptime for 99,8% for each calendar month.
            </li>
            <li>
              Exception<br />
              System failure is not Service Provider's responsibility if such system failure is caused by:
              <ol className="list-lower-alpha">
                <li>
                  Service use by User with manners which are not allowed by this Terms and Condition or applicable Cooperation Agreement;
                </li>
                <li>
                  general internet issues, force majeure, or other factors beyond of Service Provider's control;
                </li>
                <li>
                  failure or malfunction on User's tools including but not limited to Application, network connection, or other infrastructures; or
                </li>
                <li>
                  failure or system malfunction, third party's actions or negligence; or scheduled maintenance or reasonable emergency maintenance.
                </li>
              </ol>
            </li>
            <li>
              User contacts the Service Provider for assistance in using Werk only through the intercom chat service available on the Werk Website at Work Time.
            </li>
          </ol>
        </section>

        <section id="IX" className="mt-5">
          <h3 className="h5">IX. Relationship With Thirdparty</h3>
          <ol className="pl-4 mt-0">
            <li>
              Service Provider will not disclose User's Data to a third party unless it is obligated by law and/or by order of laws and regulations or governmental or judicial institutions, unless with written approval from User.
            </li>
            <li>
              Service Provider is not responsible for the third party's service who makes partners with Service Provider.
            </li>
            <li>
              All risks which occur if caused by a third party's service who make partners with Service Provider, shall become the third party's responsibility.
            </li>
          </ol>
        </section>

        <section id="X" className="mt-5">
          <h3 className="h5">X. Electronic Transmission</h3>
          <p>This Terms and Conditions, and every amendment, by any means that is accepted, shall be treated as it should be as a contract and shall be deemed to have legal consequences which equally bind as the original versions which are signed directly.</p>
        </section>

        <section id="XI" className="mt-5">
          <h3 className="h5">XI. Force Majure</h3>
          <p>
            If Service Provider cannot perform obligations, either partially or wholly, caused by events beyond Service Provider's control or capability, including but not limited to natural disaster, war, riot, government policy/regulations which prohibit or restrict the Service Provider from operating under Indonesian law jurisdiction, and happenings or events outside Service Provider's power or capability. Therefore User relieves the Service Provider of any lawsuits in any form in relation to such condition of the Service Provider cannot perform obligations either partially or wholly.
          </p>
        </section>

        <section id="XII" className="mt-5">
          <h3 className="h5">XII. Dispute Settlement</h3>
          <ol className="pl-4 mt-0">
            <li>
              In case of dispute or conflict which arises of or in relation to these Terms and Conditions, the Service Provider and Company conduct a discussion with good faith to reach a resolution based on mutual consent until 30 (thirty) Working Days from notification of dispute/conflict. However, if the said dispute/conflict cannot be resolved through discussion within 30 (thirty) Working Days, therefore the dispute/conflict will be resolved through Malang District Court.
            </li>
            <li>
              This Term and Condition is interpreted and construed by law or jurisdiction of the Republic of Indonesia.
            </li>
          </ol>
        </section>

        <section id="XIII" className="mt-5">
          <h3 className="h5">XIII. Miscellaneous</h3>
          <ol className="pl-4 mt-0">
            <li>
              Disclaimer
              <ol className="list-lower-alpha">
                <li>
                  Werk is not responsible for any kind of negligence by the User.
                </li>
                <li>
                  By using Werk Service, the User automatically follows systems available within Werk's features.
                </li>
                <li>
                  User is responsible for confirming the truth, validity, and clarity of documents for Werk registration, and by this, User reliefs Werk of any lawsuits, demands, and/or compensation from any party in relation to the falsehood of information, Data, remark, authority or power granted by User.
                </li>
              </ol>
            </li>
            <li>
              Amendment<br />
              By giving notification to User, in accordance with the prevailing regulations, User hereby agrees that at any time Werk has the right to change, which include but is not limited to revise, add or reduce, provisions within Terms and Condition, and User is subject to all changes made by Werk.
            </li>
            <li>
              Communication<br />
              Users can contact Werk through:
              <ol className="list-lower-alpha pl-4">
                <li>
                  mail: business@werk.id
                </li>
                <li>
                  Phone: xxxxxxxxx
                </li>
              </ol>
            </li>
          </ol>
        </section>

        <section id="XIV" className="mt-5">
          <h3 className="h5">XIV. Applicable Document</h3>
          <ol className="pl-4 mt-0">
            <li>
              As an addition and complement of this Terms and Conditions, the following documents also prevail on the use of Werk Service and application by User;
              <ol className="list-lower-alpha">
                <li>
                Privacy Policy, which sets out provisions prevailing at the time Service Provider organizes Data collected from User, or which User provided to Service Provider. By using Werk, You agree to the collection, use, and disclose of Your Data and You assure all Data You give is accurate;
                </li>
                <li>
                  Service use agreement, which prevails for the User who subscribes Werk Service and application for any period;
                </li>
                <li>
                  End User Agreement (if relevant).
                </li>
              </ol>
            </li>
            <li>
              If there is a contradiction between this Term and Condition with the Cooperation Agreement, therefore the provisions contained in this Terms and Condition shall prevail.
            </li>
          </ol>
        </section>

        <p className="pt-4">
          By using Werk, You admit that You have read, understood, and agreed on these Terms and Conditions.
        </p>
      </Container>
    </WelcomeLayout>
  );
}

export default TermsOfService;
