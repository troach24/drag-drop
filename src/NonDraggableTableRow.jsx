import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styled from "styled-components";


export const NonDraggableTableRow = ({ row }) => {
  const colorCodeLookup = {
    "QB": "#FF7B7A",
    "RB": "#005B96",
    "WR": "#77AB59",
    "TE": "#BE29EC",
  }

  const TableData = styled.td`
    background: white;
    &:first-of-type {
      min-width: .5ch;
    }
    &:nth-of-type(2) {
      font-weight: bold;
      color: ${colorCodeLookup[row.original.position]}
    }
  `;

  const {
    transform,
    transition,
    setNodeRef
  } = useSortable({
    id: row.original.id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition
  };

  return (
    <tr ref={setNodeRef} style={style} {...row.getRowProps()}>
      {row.cells.map((cell, i) => {
        return (
          <TableData {...cell.getCellProps()}>
            {cell.render("Cell")}
          </TableData>
        );
      })}
    </tr>
  );
};
