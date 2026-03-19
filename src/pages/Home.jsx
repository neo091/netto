import Footer from "../components/Footer"
import Header from "../components/Header"
import HomeSection from "../components/HomeSection"
import CenterButton from "../components/CenterButton"
import FinishTripDialog from "../components/FinishTripDialog"
import Loader from "../components/Loader"
import { useAuth } from "../context/auth/useAuth"
import Layout from "../layouts/Layout"

const Home = () => {
  const { user, loading } = useAuth()

  if (loading) return <Loader />

  if (!user) return <HomeSection />

  return (
    <Layout>
      <Header />
      <CenterButton />
      <Footer />
      <FinishTripDialog />
    </Layout>
  )
}

export default Home
