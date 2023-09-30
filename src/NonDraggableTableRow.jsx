import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styled from "styled-components";


export const NonDraggableTableRow = ({ row }) => {
  const colorCodeLookup = {
    "QB": "#FFBABA",
    "RB": "#B3CDE0",
    "WR": "#A0E1A4",
    "TE": "#EFBBFF",
  }

  const TableData = styled.td`
    background: ${colorCodeLookup[row.original.position]};
    border-color: ${colorCodeLookup[row.original.position]};
    &:first-of-type {
      text-align: center;
    }
    &:nth-of-type(2) {
      font-weight: bold;
    }
    &:last-of-type {
      text-align: center;
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
