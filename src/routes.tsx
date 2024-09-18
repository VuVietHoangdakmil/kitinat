import { PageCRUD } from "./types/enum";
export const admin = "/admin";
export const routers = {
  home: "/home",
  menu: "/menu",
  about: "/about",
  event: "/event",
  eventPage: "/tin-tuc-su-kien",
  product: "/product",
  blog: "/blog",
  store: "/store",
  admin: {
    product: admin + "/product",
    productView: admin + `/product/${PageCRUD.VIEW}`,
    productCreate: admin + `/product/${PageCRUD.CREATE}`,
    productUpdate: admin + `/product/${PageCRUD.UPDATE}`,

    blog: admin + "/blog",
    blogView: admin + `/blog/${PageCRUD.VIEW}`,
    blogCreate: admin + `/blog/${PageCRUD.CREATE}`,
    blogUpdate: admin + `/blog/${PageCRUD.UPDATE}`,

    info: admin + "/info",
    store: admin + "/store",
    storeView: admin + `/store/${PageCRUD.VIEW}`,
    storeCreate: admin + `/store/${PageCRUD.CREATE}`,
    storeUpdate: admin + `/store/${PageCRUD.UPDATE}`,
  },
};
