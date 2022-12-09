import type { ReactElement } from 'react';
import LayoutHome from '../components/layouts/Home/LayoutHome';
import FormSignUp from '../modules/signup/FormSignUp';

const SignUp = () => {
  return (
    <div className="bg-white py-9 px-4 d-flex align-items-center flex-grow-1">
      <FormSignUp />
    </div>
  )
}

SignUp.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutHome title="Signup">
      {page}
    </LayoutHome>
  )
}

export default SignUp;
