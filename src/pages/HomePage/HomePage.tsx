import HeroSection from './sections/HeroSection'
import FindingsSection from './sections/FindingsSection'
import FrameworkSection from './sections/FrameworkSection'
import EntriesSection from './sections/EntriesSection'
import ChangelogSection from './sections/ChangelogSection'

export default function HomePage() {
  return (
    <div className="w-full">
      <HeroSection />
      <div className="mx-auto max-w-6xl space-y-14 px-4 py-12 md:px-6 md:py-16">
        <FindingsSection />
        <FrameworkSection />
        <EntriesSection />
        <ChangelogSection />
      </div>
    </div>
  )
}
