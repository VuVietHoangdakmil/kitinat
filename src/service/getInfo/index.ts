import { KEY } from "../../types/enum";
import { firebaseService } from "../crudFireBase";
import { Info } from "../../types/data/info";
export const getInfo = async (): Promise<Info | null> => {
  const info = await firebaseService.getById<Info>("info", KEY.KEY_INFO);
  return info;
};
