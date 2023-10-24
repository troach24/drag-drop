import React, { useState, useRef } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DragHandle } from "./DragHandle";
import { EditCell } from "./EditCell";
import styled from "styled-components";
import { updatePlayerNote } from "./API/client";
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

  const [selectedId, setSelectedId] = useState('');
  const [notesVal, updateNotesVal] = useState(row.original.notes);
  const notesRef = useRef(row.original.notes);

  const setEditRow = (rowId) => {
    setSelectedId(rowId);
  }

  function cancelEditRow() {
    setSelectedId('');
  }
  
  function updateEditRow(val) {
    notesRef.current = val;
  }
  
  async function saveEditRow() {
    updateNotesVal(notesRef.current);
    await updatePlayerNote(row.original.id, notesRef.current);
    row.original.notes = notesRef.current;
    setSelectedId('');
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
          if (i === 3) {
            return (
              row.original.id === selectedId ? 
                <TableData {...cell.getCellProps()}>
                  <InputStyle type="text" ref={notesRef} defaultValue={notesVal} onChange={(e) => updateEditRow(e.target.value)} />
                </TableData>
                :
                <TableData {...cell.getCellProps()}>
                  {cell.render("Cell")}
                </TableData>
            );
          }
          if (i === 5) {
            return (
              <TableData {...cell.getCellProps()}>
                <EditCell
                  row={row}
                  selectedId={selectedId}
                  setEditRow={setEditRow}
                  cancelEditRow={cancelEditRow}
                  saveEditRow={saveEditRow}
                />
              </TableData>
            );
          }
          if (i === 6) {
            return (
              <TableData {...cell.getCellProps()}>
                <CrudRow
                  row={row}
                  selectedId={selectedId}
                  setEditRow={setEditRow}
                  cancelEditRow={cancelEditRow}
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
