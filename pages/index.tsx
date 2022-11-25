import Skeleton from 'react-loading-skeleton';
import FormLogin from '../modules/login/FormLogin';
import Layout from '../components/layouts/Home/LayoutHome';

export default function Home() {
  return (
    <Layout>
      <div className="container-home">
        <div>
          <FormLogin/>
        </div>
      </div>
    </Layout>
    
  )
}
