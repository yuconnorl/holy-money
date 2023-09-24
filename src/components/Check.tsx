import { retrieveIdFromStores } from "@/utils/func";

export default async function Check() {
  const statement = "龍德";
  const checker = await retrieveIdFromStores(statement);

  console.log(checker);

  return <div className="container mx-auto py-10">Checker</div>;
}
