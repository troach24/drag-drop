import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import styled from "styled-components";

const DialogWindowStyle = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
`
  
const dialogStyleObj = {
  width: '70vw',
  backgroundColor: 'white',
  padding: '15px'
}

export function CrudRow({row, selectedId, setEditRow, cancelEditRow, saveEditRow }) {
    const [visible, setVisible] = useState(false);
    
    function setValue(val, field) {
      row.original[field] = val;
    }

    function getRowName() {
      return `Editing ${row.original.name}`;
    }

    return (
        <div className="card flex justify-content-center">
            <Button label="Show" icon="pi pi-external-link" onClick={() => setVisible(true)} />
            <Dialog header={getRowName} visible={visible} style={dialogStyleObj} onHide={() => setVisible(false)}>
              <div className="card flex justify-content-center">
                <InputText value={row.original.name} onChange={(e) => setValue(e.target.value, 'name')} />
                <p className="m-0">
                    {row.original.notes}
                </p>
              </div>
            </Dialog>
        </div>
    )
}