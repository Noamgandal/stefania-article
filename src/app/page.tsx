import { sections, paperMetadata } from '@/content/paper';
import { figures } from '@/content/figures';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { TableOfContents } from '@/components/sections/TableOfContents';
import { ArticleSection } from '@/components/sections/ArticleSection';
import { FigureNavigator } from '@/components/sections/FigureNavigator';
import { AudioInline } from '@/components/audio/AudioInline';
import { AudioProvider } from '@/components/audio/AudioProvider';
import { StickyPlayer } from '@/components/audio/StickyPlayer';
import { MedievalCreature } from '@/components/easter-egg/MedievalCreature';

const tocSections = sections.map((s) => ({
  id: s.id,
  title: s.title,
  number: s.number,
}));

export default function Home() {
  return (
    <AudioProvider>
      <Header />

      <main>
        <Hero />

        <div className="relative px-4 md:px-8 py-10">
          {/* Audio options below hero */}
          <div className="prose-column mb-10">
            <AudioInline />
          </div>

          {/* Article body with TOC sidebar */}
          <div className="relative max-w-7xl mx-auto xl:flex xl:gap-12">
            {/* TOC handles its own desktop/mobile rendering */}
            <TableOfContents sections={tocSections} />

            {/* Article content */}
            <article className="flex-1 min-w-0">
              {sections.map((section) => {
                const figureData = section.figures?.map(ref => ({
                  paragraphIndex: ref.paragraphIndex,
                  figureData: figures.find(f => f.id === ref.id)!,
                })).filter(f => f.figureData) || [];

                return (
                  <div key={section.id} className="mb-16">
                    <ArticleSection
                      id={section.id}
                      number={section.number}
                      title={section.title}
                      paragraphs={section.paragraphs}
                      figures={figureData}
                    />
                  </div>
                );
              })}
            </article>
          </div>
        </div>

        {/* Sentinel for easter egg at ~60% */}
        <MedievalCreature />
        <FigureNavigator />
      </main>

      <Footer />
      <StickyPlayer />
    </AudioProvider>
  );
}
