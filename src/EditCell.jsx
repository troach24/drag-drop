import React from "react";
import styled from "styled-components";

const EditCellStyle = styled.div`
  min-width: 1vw;
`
  
const SelectedCellStyle = styled.div`
  min-width: 7vw;
`

export function EditCell ({ row, selectedId, setEditRow, cancelEditRow, saveEditRow }) {
  const setId = function () {
    setEditRow(row.original.id);
  }

  return row.original.id === selectedId ? (
    <SelectedCellStyle>
      <>
        <button onClick={cancelEditRow}>X</button> <button onClick={saveEditRow}>✔</button>
      </>
    </SelectedCellStyle>
  ) : (
    <EditCellStyle>
      <button onClick={setId}>✐</button>
    </EditCellStyle>
  )
}
