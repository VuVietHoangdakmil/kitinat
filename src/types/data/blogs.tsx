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
