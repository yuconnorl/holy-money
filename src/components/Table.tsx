import { getRecord, joinTables } from "@/utils/func";
import DataTable from "./ui/data-table";

import Column from "@/components/Column";

export default async function Table() {
  const tableData = await getRecord();
  const joined = await joinTables();

  console.log(joined);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={Column} data={joined} />
    </div>
  );
}
