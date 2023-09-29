import React from "react";
import styled from "styled-components";
import makeData from "./makeData";
import { Table } from "./Table";
import { updatePlayerData } from "./API/client";

const Styles = styled.div`
padding: 1rem .5rem 1rem;
display: flex;
flex-direction: column;
align-items: center;

table {
  width: 75vw;
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
@media screen and (max-width: 900px) {
  table {
    width: 100%;
  }
}
`;

function PlayerRank() {
  const columns = React.useMemo(
    () => [
      {
        Header: "Rest of Season Top 169 (0.5 PPR)",
        columns: [
          {
            Header: "",
            accessor: "overall_rank"
          },
          {
            Header: "NAME",
            accessor: "name"
          },
          {
            Header: "NOTE",
            accessor: "notes"
          },
          {
            Header: "POS",
            accessor: "positional_rank"
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
      await updatePlayerData(newData);
    } catch (error) {
      console.error(error);
    } finally {
      // done
      console.log('update players - success');
    }
  };

  React.useEffect(() => {
    let isSubscribed = true;
    const getPlayers = async () => {
      try {
        const playerData = await makeData(169);
        console.log('get players - success');
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

export default PlayerRank;
