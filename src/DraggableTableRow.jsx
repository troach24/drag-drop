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
    &:nth-of-type(3) {
      font-weight: bold;
      color: ${colorCodeLookup[row.original.position]}
    }
    @media screen and (max-width: 900px) {
      &:first-of-type {
        min-width: .1ch;
      }
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
