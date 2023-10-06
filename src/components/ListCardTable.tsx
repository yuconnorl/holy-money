import dayjs from "dayjs";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { joinTables } from "@/utils/func";
import { toLocalStringEn } from "@/utils/math";

interface Props {
  amount: string;
  storeName: string | null;
  categoryName: string | null;
  recordDate: string;
}

const ListCard = ({ amount, storeName, categoryName, recordDate }: Props) => {
  return (
    <div className="flex items-center">
      <Avatar className="h-9 w-9">
        <AvatarImage src="/avatars/01.png" alt="Avatar" />
        <AvatarFallback>OM</AvatarFallback>
      </Avatar>
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">{storeName}</p>
        <p className="text-sm text-muted-foreground">{categoryName}</p>
      </div>
      <div className="space-y-1 ml-auto text-right">
        <p className="text-sm font-medium text-muted-foreground leading-none">
          {dayjs(recordDate).format("MMM-DD")}
        </p>
        <p className="text-base">{`$${toLocalStringEn(amount)}`}</p>
      </div>
    </div>
  );
};

export default async function ListCardTable() {
  const joinedRecord = await joinTables();
  const totalRecordNumber = joinedRecord.length ? joinedRecord.length : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
        <CardDescription>{totalRecordNumber} records in total</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-72">
          <div className="flex flex-col gap-6">
            {joinedRecord.map(
              ({ id, amount, recordDate, storeName, categoryName }) => {
                return (
                  <ListCard
                    key={id}
                    amount={amount}
                    storeName={storeName}
                    categoryName={categoryName}
                    recordDate={recordDate}
                  />
                );
              }
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
