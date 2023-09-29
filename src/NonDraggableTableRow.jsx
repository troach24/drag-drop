import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styled from "styled-components";

const TableData = styled.td`
  background: white;
  &:first-of-type {
    min-width: .5ch;
  }
  &:nth-of-type(2) {
    font-weight: bold;
  }
`;

export const NonDraggableTableRow = ({ row }) => {
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
