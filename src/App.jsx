import { Navbar } from '@/components/Navbar'
import { HeroSection } from '@/components/HeroSection'
import { FeaturesSection } from '@/components/FeaturesSection'
import { MapVisualization } from '@/components/MapVisualization'
import { TaskCards } from '@/components/TaskCards'
import { SocialSection } from '@/components/SocialSection'
import { AppShowcase } from '@/components/AppShowcase'
import { Footer } from '@/components/Footer'

function App() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <section id="features">
        <FeaturesSection />
      </section>
      <section id="map">
        <MapVisualization />
      </section>
      <section id="tasks">
        <TaskCards />
      </section>
      <section id="community">
        <SocialSection />
      </section>
      <AppShowcase />
      <Footer />
    </main>
  )
}

export default App
