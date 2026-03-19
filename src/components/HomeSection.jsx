import FeaturesSection from "./features/FeatureSection"
import Hero from "./features/Hero"
import StatsSection from "./features/StatsSection"
import HomeCTASection from "./features/HomeCTASection"
import Layout from "../layouts/Layout"

function HomeSection() {
  return (
    <Layout>
      {/* --- HERO SECTION --- */}
      <Hero />

      {/* --- FEATURE SECTION --- */}
      <FeaturesSection />

      {/* --- STATS SECTION --- */}
      <StatsSection />

      {/* --- FOOTER CTA --- */}
      <HomeCTASection />
    </Layout>
  )
}






export default HomeSection
