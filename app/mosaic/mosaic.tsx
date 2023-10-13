"use client";
export type ViewId =
  | "chart"
  | "recordAdding"
  | "categoryAdding"
  | "recordTable";

import React, { Suspense } from "react";
import { Mosaic, MosaicWindow } from "react-mosaic-component";

import CategeoryCard from "@/components/CategoryCard";
import ChartCard from "@/components/ChartCard";
import RecordCard from "@/components/RecordCard";
import RecordTable from "@/components/Table";

const TITLE_MAP: Record<ViewId, string> = {
  chart: "CHART",
  recordTable: "RECORD TABLE",
  recordAdding: "ADD RECORD",
  categoryAdding: "ADD CATEGORY",
};

const COMPONENT_MAP = {
  chart: <ChartCard />,
  recordAdding: () => <div>plase</div>,
  categoryAdding: () => <div>plase</div>,
  recordTable: () => <div>plase</div>,
};

// const COMPONENT_MAP = {
//   chart: <ChartCard />,
//   recordAdding: () => (<div>plase</div>),
//   categoryAdding: <CategeoryCard />,
//   recordTable: <RecordTable />,
// };

const MosaicComponent = () => {
  console.log("rerender");

  return (
    <Mosaic<ViewId>
      className=" text-lg text-neutral-600"
      renderTile={(id, path) => {
        return (
          <MosaicWindow
            path={path}
            createNode={() => "new"}
            title={TITLE_MAP[id]}
          >
            <Suspense fallback={<div>loading</div>}>
              {COMPONENT_MAP[id]}
            </Suspense>
          </MosaicWindow>
        );
      }}
      initialValue={{
        direction: "row",
        first: {
          direction: "column",
          first: "chart",
          second: "recordTable",
        },
        second: {
          direction: "column",
          first: "recordAdding",
          second: "categoryAdding",
        },
      }}
    />
  );
};

export default MosaicComponent;
