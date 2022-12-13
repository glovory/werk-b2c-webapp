import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

export default function LinkedInConnect(){
  const navigate = useNavigate();

  return (
    <main className="min-h-screen py-9 px-4 flex flex-col justify-center items-center">
      <p className="pb-5">
        <img src="/image/brand/linkedIn-logo.webp" alt="Linkedin" width={113} height={31} />
      </p>

      <div className="lg:w-1/4 md:w-2/4 text-sm">
        <div className="card shadow-sm flex flex-col min-w-0 bg-white rounded mt-20">
          <div className="card-body grow p-4">
            <div className="flex gap-7 justify-center mb-8" style={{ marginTop: -85 }}>
              <img src="/image/misc/user_1.png" alt="User" width={104} height={104} className="flex-none rounded-full" />
              <div className="rounded bg-orange-500 p-5">
                <img src="/image/werk-logo-white.svg" alt="Werk" width={71.5} height={71.5} />
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
              You can stop this sync in your LinkedIn <a href="#" className="font-medium">settings</a>.<br />
              Jobscan <a href="#" className="font-medium">terms</a> apply. <a href="#" className="font-medium">Learn more</a>.
            </p>

            <div className="font-medium text-center mt-7">
              <a href="#">Not you?</a>
            </div>
          </div>
        </div>

        <div className="grid gap-3 my-4">
          <Button onClick={() => navigate("/signup")} variant="outlined">Cancel</Button>
          <Button  onClick={() => navigate("/import-linkedin-profile")} variant="contained">Allow</Button>
        </div>

        <p className="font-medium text-center pt-4">
          You will be redirected to https://www.werk.id
        </p>
      </div>
    </main>
  );
}
