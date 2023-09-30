import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DragHandle } from "./DragHandle";
import styled from "styled-components";

const DraggingRow = styled.td`
  background: rgb(0, 99, 66);
`;

export const DraggableTableRow = ({ row }) => {
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
      min-width: .5ch;
      text-align: center;
    }
    &:nth-of-type(2) {
      text-align: center;
    }
    &:nth-of-type(3) {
      font-weight: bold;
    }
    &:last-of-type {
      min-width: .5ch;
      text-align: center;
    }
    `;

  const {
    attributes,
    listeners,
    transform,
    transition,
    setNodeRef,
    isDragging
  } = useSortable({
    id: row.original.id
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition
  };
  return (
    <tr ref={setNodeRef} style={style} {...row.getRowProps()}>
      {isDragging ? (
        <DraggingRow colSpan={row.cells.length}>&nbsp;</DraggingRow>
      ) : (
        row.cells.map((cell, i) => {
          if (i === 0) {
            return (
              <TableData {...cell.getCellProps()}>
                <DragHandle {...attributes} {...listeners} />
                <span>{cell.render("Cell")}</span>
              </TableData>
            );
          }
          return (
            <TableData {...cell.getCellProps()}>
              {cell.render("Cell")}
            </TableData>
          );
        })
      )}
    </tr>
  );
};
