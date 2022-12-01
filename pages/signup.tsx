import Head from 'next/head';
import Layout from '../components/layouts/Home/LayoutHome';
import FormSignUp from '../modules/signup/FormSignUp';

export default function SignUp(){
  return (
    <Layout>
      <Head>
        <title>Signup</title>
      </Head>

      <div className="bg-white py-9 px-4 d-flex align-items-center flex-grow-1">
        <FormSignUp />
      </div>
    </Layout>
  )
}
