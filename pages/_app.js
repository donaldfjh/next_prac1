import '../styles/globals.css'
import Layout from '../components/layout/Layout'
//Component is the prop tha hold actual page render
//pageProps are pros that might be getting 
function MyApp({ Component, pageProps }) {
  return <Layout><Component {...pageProps} /></Layout>
}

export default MyApp
