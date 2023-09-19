import { db } from "@/db/drizzle";

const Test = () => {
  console.log(db);

  return <div>test</div>;
};

export default Test;
