"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Record = {
  id: number;
  amount: string;
  storeId: number;
  categoryId: number;
  memo: string;
  createdAt: Date;
};

const columns: ColumnDef<Record>[] = [
  {
    accessorKey: "storeName",
    header: "Store",
  },
  {
    accessorKey: "categoryName",
    header: "category",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "memberName",
    header: "Member",
  },
  {
    accessorKey: "memo",
    header: "Memo",
  },
  {
    accessorKey: "createdAt",
    header: "createdAt",
  },
];

export default columns;
