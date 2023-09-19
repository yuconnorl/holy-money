import Test from "@/components/Test";
import { addCategory } from "@/utils/actions";
import { revalidatePath } from "next/cache";

const records: String[] = ["aaa", "bbb"];

export default function Home() {
  async function addRecord(data: FormData) {
    "use server";
    const record = data.get("money") as string;
    records.push(record);
    revalidatePath("/");
  }

  return (
    <main className="p-24">
      <div className="flex flex-col">
        {records.map((record, index) => {
          return <div key={index}>{record}</div>;
        })}
      </div>
      <Test></Test>
      <form action={addCategory}>
        <input type="text" className=" text-black" name="money" />
        <button type="submit">add record</button>
      </form>
    </main>
  );
}
