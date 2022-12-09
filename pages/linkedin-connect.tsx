import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Button from 'react-bootstrap/Button';

export default function LinkedInConnect(){
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Linkedin Connect</title>
      </Head>

      <main className="min-vh-100 py-9 px-4 d-flex flex-column justify-content-center align-items-center">
        <p className="pb-5">
          <Image src="/image/brand/linkedIn-logo.webp" alt="Linkedin" width={113} height={31} />
        </p>

        <div className="col-md-3 col-sm-6">
          <div className="card shadow-sm mt-20">
            <div className="card-body">
              <div className="d-flex gap-7 justify-content-center mb-8" style={{ marginTop: -85 }}>
                <Image priority src="/image/misc/user_1.png" alt="User" width={104} height={104} className="flex-none rounded-circle" />
                <div className="rounded bg-warning p-5">
                  <Image src="/image/werk-logo-white.svg" alt="Werk" width={71.5} height={71.5}  />
                </div>
              </div>

              <p>
                <b>Werk</b> would like to:
              </p>

              <ul>
                <li>Use your name and photo</li>
                <li>Use the primary email address associated with your LinkedIn account</li>
              </ul>

              <p>
                You can stop this sync in your LinkedIn <a href="#" className="fw-bold">settings</a>.<br />
                Jobscan <a href="#" className="fw-bold">terms</a> apply. <a href="#" className="fw-bold">Learn more</a>.
              </p>

              <div className="fw-bold text-center mt-7">
                <a href="#">Not you?</a>
              </div>
            </div>
          </div>

          <div className="d-grid gap-3 my-4">
            <Button onClick={() => router.push("/signup")} variant="outline-dark">Cancel</Button>
            <Button  onClick={() => router.push("/import-linkedin-profile")}>Allow</Button>
          </div>

          <p className="fw-bold text-center text-black-50 pt-4">
            You will be redirected to https://www.werk.id
          </p>
        </div>
      </main>

    </>
  );
}
