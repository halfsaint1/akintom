import Link from "next/link";
import Image from "next/image";
import { CalendarDays, Clock } from "lucide-react";
import { categoryLabel, type NewsPost } from "@/lib/data/news";

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function NewsCard({ post }: { post: NewsPost }) {
  return (
    <article className="card-lift group h-full overflow-hidden rounded-2xl border border-navy/5 bg-white shadow-soft">
      <Link href={`/news/${post.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-[16/9] overflow-hidden bg-mist">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute left-4 top-4 rounded-full bg-navy/85 px-3 py-1.5 text-xs font-semibold text-gold backdrop-blur">
            {categoryLabel(post.category)}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-graphite">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
              <time dateTime={post.date}>
                {dateFormatter.format(new Date(post.date))}
              </time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
              {post.readMinutes} min read
            </span>
          </div>
          <h3 className="mt-3 font-display text-lg font-bold leading-snug text-navy group-hover:underline group-hover:decoration-gold group-hover:underline-offset-4">
            {post.title}
          </h3>
          <p className="mt-3 flex-1 text-sm leading-7 text-graphite">
            {post.excerpt}
          </p>
        </div>
      </Link>
    </article>
  );
}
