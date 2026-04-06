import { cn } from '@/lib/utils';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

interface ArticleSectionProps {
  id: string;
  number?: number;
  title: string;
  paragraphs: string[];
  className?: string;
}

export function ArticleSection({
  id,
  number,
  title,
  paragraphs,
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

        if (isBlockquote) {
          return (
            <ScrollReveal key={i}>
              <div
                className="my-10 px-8 py-6 border-l-2 border-accent-500/40 text-center italic font-serif text-foreground/70 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </ScrollReveal>
          );
        }

        return (
          <ScrollReveal key={i}>
            <p
              className="mb-6 font-serif text-base md:text-lg leading-relaxed text-foreground"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </ScrollReveal>
        );
      })}
    </section>
  );
}
