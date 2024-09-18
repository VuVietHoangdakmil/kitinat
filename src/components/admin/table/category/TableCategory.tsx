import React from "react";
import { usePagination } from "../../../../hook/helpers/usePagination.hook";
import { getListCategories } from "../../../../services/category.service";

const TableCategory = () => {
  const { data } = usePagination("list-categories", {}, getListCategories);
  console.log(data);
  return <div>TableCategory</div>;
};

export default TableCategory;
