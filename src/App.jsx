import React from "react";
import styled from "styled-components";
import logo from './mh-logo.jpg';
import makeData from "./makeData";
import { Table } from "./Table";
import { useFlexLayout } from "react-table";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

function App() {
  const columns = React.useMemo(
    () => [
      {
        Header: "MH TOP 169",
        columns: [
          {
            Header: "",
            accessor: "blank_id"
          },
          {
            Header: "RANK",
            accessor: "rank"
          },
          {
            Header: "BYE",
            accessor: "bye"
          },
          {
            Header: "NAME",
            accessor: "name"
          },
          {
            Header: "NOTES",
            accessor: "notes"
          },
        ]
      },
    ],
    []
  );

  const [data, setData] = React.useState(makeData(32));
  return (
    <Styles>
      <div className="header">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      <br />
      <br />
      <Table columns={columns} data={data} setData={setData} />
    </Styles>
  );
}

export default App;
