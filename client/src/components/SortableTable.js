import { GoArrowSmallDown, GoArrowSmallUp } from "react-icons/go";
import Table from "./Table";
import Skeleton from "./Skeleton";
import useSort from "../hooks/use-sort";
import useUsersContext from "../hooks/use-users-context";

function SortableTable(props) {
  const { config, data } = props;
  const { sortBy, sortOrder, sortedData, setSortColumn } = useSort(
    data,
    config
  );
  const { isLoading } = useUsersContext();

  const updatedConfig = config.map((col) => {
    if (!col.sortValue) {
      return col;
    }
    return {
      ...col,
      header: () => (
        <th
          className="cursor-pointer hover:bg-gray-100"
          onClick={() => setSortColumn(col.label)}
        >
          <div className="flex items-center justify-center gap-4">
            {getIcons(col.label, sortBy, sortOrder)}
            {col.label}
          </div>
        </th>
      ),
    };
  });

  return (
    <Table
      {...props}
      config={updatedConfig}
      data={sortedData}
      loader={isLoading && <Skeleton times={6} className="h-12 w-full" />}
    ></Table>
  );
}

function getIcons(label, sortBy, sortOrder) {
  if (label !== sortBy) {
    return (
      <div>
        <GoArrowSmallUp></GoArrowSmallUp>
        <GoArrowSmallDown></GoArrowSmallDown>
      </div>
    );
  }

  if (sortOrder === null) {
    return (
      <div>
        <GoArrowSmallUp></GoArrowSmallUp>
        <GoArrowSmallDown></GoArrowSmallDown>
      </div>
    );
  } else if (sortOrder === "asc") {
    return (
      <div>
        <GoArrowSmallUp></GoArrowSmallUp>
      </div>
    );
  } else if (sortOrder === "desc") {
    return (
      <div>
        <GoArrowSmallDown></GoArrowSmallDown>
      </div>
    );
  }
}

export default SortableTable;
