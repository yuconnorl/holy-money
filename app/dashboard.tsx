import CategoryCard from "@/components/CategoryCard";
import ChartCard from "@/components/ChartCard";
import ListCardTable from "@/components/ListCardTable";
import RecordCard from "@/components/RecordCard";

export default async function Dashboard() {
  return (
    <div className="grid md:gap-4 lg:grid-cols-10 xl:grid-cols-11 xl:gap-4">
      <div className="space-y-4 lg:col-span-6 xl:col-span-7 xl:space-y-4">
        <ChartCard />
        <ListCardTable />
      </div>
      <div className="space-y-4 lg:col-span-4 xl:col-span-4 xl:space-y-4">
        <RecordCard />
        <CategoryCard />
      </div>
    </div>
  );
}
