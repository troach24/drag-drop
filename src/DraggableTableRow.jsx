import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DragHandle } from "./DragHandle";
import styled from "styled-components";
import { updatePlayer } from "./API/client";
import { CrudRow } from "./CrudRow";

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
    &:nth-of-type(5) {
      text-align: center;
    }
    &:last-of-type {
      min-width: .5ch;
      text-align: center;
    }
  `;

  const InputStyle = styled.input`
    background-color: ${colorCodeLookup[row.original.position]};
    border: solid black 1px;
    width: 100%;
  `

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
  
  async function saveEditRow(player_obj) {
    await updatePlayer(player_obj);
  }

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
          if (i === 6) {
            return (
              <TableData {...cell.getCellProps()}>
                <CrudRow
                  row={row}
                  saveEditRow={saveEditRow}
                />
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
