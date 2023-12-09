import React, { useState, useRef } from "react";
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
  padding: '15px',
  border: 'solid 2px black',
}

export function CrudRow({row, saveEditRow }) {
  const [visible, setVisible] = useState(false);
  const [playerName, setName] = useState(row.original.name);
  const [playerTeam, setTeam] = useState(row.original.team);
  const [playerPosition, setPosition] = useState(row.original.position);
  const [playerNotes, setNotes] = useState(row.original.notes);
  
  const nameRef = useRef(row.original.name);
  const teamRef = useRef(row.original.team);
  const positionRef = useRef(row.original.position);
  const notesRef = useRef(row.original.notes);

  function closePlayer() {
    setVisible(false);
  }
    
  function savePlayer() {
    setName(nameRef.current);
    setTeam(teamRef.current);
    setPosition(positionRef.current);
    setNotes(notesRef.current);
    const updateObj = {
      _id: row.original.id,
      name: nameRef.current,
      team: teamRef.current,
      position: positionRef.current,
      notes: notesRef.current,
    }
    setVisible(false);
    saveEditRow(updateObj);
  }

  function getRowName() {
    return `Editing: ${nameRef.current}`;
  }
  
  function updateName(val) {
    nameRef.current = val;
  }
  
  function updateTeam(val) {
    teamRef.current = val;
  }

  function updatePosition(val) {
    positionRef.current = val;
  }
  
  function updateNotes(val) {
    notesRef.current = val;
  }

  return (
    <div className="card flex justify-center">
        <Button label="✎" icon="pi pi-external-link" onClick={() => setVisible(true)} />
        <Dialog header={getRowName} visible={visible} style={dialogStyleObj} onHide={() => closePlayer()}>
          <br />
          <label htmlFor="name">Name</label>
          <br />
          <InputText className="m-0 p-inputtext-lg" defaultValue={playerName} onChange={(e) => updateName(e.target.value, 'name')} />
          <br />
          <br />
          <label htmlFor="team">Team</label>
          <br />
          <InputText className="m-0 p-inputtext-lg" defaultValue={playerTeam} onChange={(e) => updateTeam(e.target.value, 'team')} />
          <br />
          <br />
          <label htmlFor="position">Position</label>
          <br />
          <InputText className="m-0 p-inputtext-lg" defaultValue={playerPosition} onChange={(e) => updatePosition(e.target.value, 'position')} />
          <br />
          <br />
          <label htmlFor="notes">Notes</label>
          <br />
          <InputText className="m-0 p-inputtext-lg" defaultValue={playerNotes} onChange={(e) => updateNotes(e.target.value, 'notes')} />
          <br />
          <br />
          <Button label="Cancel" icon="pi pi-external-link" onClick={() => closePlayer()} />
          <Button label="Save" icon="pi pi-external-link" onClick={() => savePlayer()} />
        </Dialog>
    </div>
  )
}