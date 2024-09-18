import { Seo } from "./seo";

export interface Blog {
  id?: string;
  key?: string;
  img?: string;
  title?: string;
  summary?: string;
  content?: string;
  seo?: Seo;
}
export interface BlogBody extends Required<Omit<Blog, "id" | "key" | "seo">> {
  seo: {
    slug: string;
    meta_title: string;
    meta_keyword: string;
    meta_description: string;
  };
}
