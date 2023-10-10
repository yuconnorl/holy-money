import CategoryCard from "@/components/CategoryCard";
import ChartCard from "@/components/ChartCard";
import ListCardTable from "@/components/ListCardTable";
import RecordCard from "@/components/RecordCard";
import RecordTable from "@/components/Table";

export default async function Dashboard() {
  return (
    <div className="flex flex-col md:grid gap-4 md:grid-cols-10 lg:grid-cols-11 xl:gap-4">
      <div className="space-y-4 md:col-span-5 lg:col-span-7 lg:space-y-4">
        <ChartCard />
        {/* <ListCardTable /> */}
        <RecordTable />
      </div>
      <div className="space-y-4 md:col-span-5 lg:col-span-4 lg:space-y-4">
        <RecordCard />
        <CategoryCard />
      </div>
    </div>
  );
}
