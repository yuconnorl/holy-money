import Column from "@/components/Column";
import DataTable from "@/components/ui/data-table";
import { joinTables } from "@/utils/func";

export default async function DetailPage() {
  const joinedRecord = await joinTables();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={Column} data={joinedRecord} />
    </div>
  );
}
