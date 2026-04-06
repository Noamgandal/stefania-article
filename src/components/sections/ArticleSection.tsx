import { cn } from '@/lib/utils';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { FigureImage } from '@/components/sections/FigureImage';
import type { Figure } from '@/content/figures';

interface ArticleSectionProps {
  id: string;
  number?: number;
  title: string;
  paragraphs: string[];
  figures?: { paragraphIndex: number; figureData: Figure }[];
  className?: string;
}

export function ArticleSection({
  id,
  number,
  title,
  paragraphs,
  figures = [],
  className,
}: ArticleSectionProps) {
  return (
    <section
      id={id}
      className={cn('prose-column scroll-mt-20', className)}
    >
      <ScrollReveal>
        <h2 className="font-display text-2xl md:text-3xl text-primary-700 mb-8 leading-snug">
          {number != null && (
            <span className="text-accent-500 mr-2 text-xl">{number}.</span>
          )}
          {title}
        </h2>
      </ScrollReveal>

      {paragraphs.map((html, i) => {
        const isBlockquote = html.trimStart().startsWith('<blockquote');
        const figureForParagraph = figures.find(
          (f) => f.paragraphIndex === i
        );

        return (
          <div key={i}>
            {isBlockquote ? (
              <ScrollReveal>
                <div
                  className="my-10 px-8 py-6 border-l-2 border-accent-500/40 text-center italic font-serif text-foreground/70 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              </ScrollReveal>
            ) : (
              <ScrollReveal>
                <p
                  className="mb-6 font-serif text-base md:text-lg leading-relaxed text-foreground"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              </ScrollReveal>
            )}

            {figureForParagraph && (
              <ScrollReveal>
                <FigureImage
                  src={figureForParagraph.figureData.src}
                  alt={figureForParagraph.figureData.alt}
                  caption={figureForParagraph.figureData.caption}
                  figureNumber={
                    parseInt(figureForParagraph.figureData.id.replace('fig-', ''), 10)
                  }
                  layout={figureForParagraph.figureData.layout}
                />
              </ScrollReveal>
            )}
          </div>
        );
      })}
    </section>
  );
}
