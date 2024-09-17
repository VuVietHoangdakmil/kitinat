import { PageCRUD } from "./types/enum";
export const admin = "/admin";
export const routers = {
  home: "/home",
  menu: "/menu",
  about: "/about",
  event: "/event",
  eventPage: "/tin-tuc-su-kien",
  product: "/product",
  admin: {
    product: admin + "/product",
    productView: admin + `/product/${PageCRUD.VIEW}`,
    productCreate: admin + `/product/${PageCRUD.CREATE}`,
    productUpdate: admin + `/product/${PageCRUD.UPDATE}`,
    blog: admin + `/blog`,
  },
};
