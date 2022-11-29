import Head from 'next/head';
// import Image from 'next/image';
// import Skeleton from 'react-loading-skeleton';
// import FormSignup from '../modules/signup/FormSignup';
import Layout from '../components/layouts/Home/LayoutHome';
import FormLogin from '../modules/login/FormLogin';

export default function SignUp(){
  return (
    <Layout>
      <Head>
        <title>Signup</title>
      </Head>

      {/* container-home */}
      <div className="bg-white py-9 px-4 d-flex align-items-center flex-grow-1">
        <FormLogin />
      </div>
    </Layout>
  )
}
