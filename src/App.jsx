import React from "react";
import styled from "styled-components";

import makeData from "./makeData";
import { Table } from "./Table";

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
        Header: "QUARTERBACKS",
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
      <Table columns={columns} data={data} setData={setData} />
    </Styles>
  );
}

export default App;
