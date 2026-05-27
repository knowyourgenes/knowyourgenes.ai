import Homepage from "../components/Homepage";
import SiteFooter from "../components/SiteFooter";
import SiteNav from "../components/SiteNav";
import { CATEGORY_FILTERS, type FilterValue } from "../components/brand-assets";
import { getFeaturedPost, getPosts } from "../sanity/fetch";

type Search = { [key: string]: string | string[] | undefined };

export const revalidate = 60;

export default async function Page({ searchParams }: { searchParams: Promise<Search> }) {
  const [posts, featuredPost, params] = await Promise.all([
    getPosts(),
    getFeaturedPost(),
    searchParams,
  ]);

  const raw = typeof params.category === "string" ? params.category : undefined;
  const initialCategory: FilterValue =
    raw && (CATEGORY_FILTERS as readonly string[]).includes(raw) ? (raw as FilterValue) : "All";

  return (
    <>
      <SiteNav />
      <Homepage posts={posts} featuredPost={featuredPost} initialCategory={initialCategory} />
      <SiteFooter />
    </>
  );
}
