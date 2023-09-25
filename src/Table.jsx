import React, { useMemo, useState } from "react";
import {
  DndContext
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { useTable } from "react-table";
import { NonDraggableTableRow } from "./NonDraggableTableRow";

export function Table({ columns, data }) {
  const items = useMemo(() => data?.map(({ id }) => id), [data]);
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  });

  // Render the UI for your table
  return (
    <DndContext>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {rows.map((row, i) => {
              prepareRow(row);
              return <NonDraggableTableRow key={row.original.id} row={row} />;
            })}
          </SortableContext>
        </tbody>
      </table>
    </DndContext>
  );
}
