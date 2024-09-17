import { Table, TableProps } from "antd";
import "./app-table.scss";
import { cn } from "../../../utils/helper/class.helper";

type AppTableProps = TableProps;
const AppTable: React.FC<AppTableProps> = ({ className, ...passProps }) => {
  return <Table className={cn("app-table", className)} {...passProps} />;
};

export default AppTable;
