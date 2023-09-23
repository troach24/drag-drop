import React from "react";
import styled from "styled-components";
import logo from './mh-logo.jpg';
import makeData from "./makeData";
import { Table } from "./Table";
import { updatePlayerData } from "./API/client";

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
            accessor: "row_idn"
          },
          {
            Header: "RANK",
            accessor: "overall_rank"
          },
          {
            Header: "POS",
            accessor: "positional_rank"
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

  const [isLoading, setLoading] = React.useState(true);
  const [data, setData] = React.useState(null);

  const updatePlayers = async (newData) => {
    setData(newData);
    try {
      const playerDataRequest = await updatePlayerData(newData);
      console.log('playerDataRequest:', playerDataRequest);
      return;
    } catch (error) {
      console.error(error);
    } finally {
      // done
      console.log('players updated');
    }
  };

  React.useEffect(() => {
    let isSubscribed = true;
    const getPlayers = async () => {
      try {
        const playerData = await makeData(20);
        console.log('playerData:', playerData);
        if (isSubscribed) {
          setData(playerData);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getPlayers()
        .catch(console.error);;
    return () => isSubscribed = false;
  }, []);

  return (
    <Styles>
      <div className="header">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      <br />
      {isLoading ? (
        <h1>Loading Player Data...</h1>
      ) : (
        <Table
          columns={columns}
          data={data}
          setData={setData}
          updatePlayers={updatePlayers}
        />
      )}
    </Styles>
  );
}

export default App;
