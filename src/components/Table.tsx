import Column from "@/components/Column";
import { joinTables } from "@/utils/func";

import DataTable from "./ui/data-table";

export default async function Table() {
  const joinedRecord = await joinTables();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={Column} data={joinedRecord} />
    </div>
  );
}
