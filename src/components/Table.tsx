import Column from "@/components/Column";
import { joinTables } from "@/utils/func";

import DataTable from "./ui/data-table";

export default async function RecordTable() {
  const joinedRecord = await joinTables();

  return (
    <div className="">
      <DataTable columns={Column} data={joinedRecord} />
    </div>
  );
}
