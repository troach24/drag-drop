import React from "react";
import styled from "styled-components";
import makeData from "./makeData";
import { EditTable } from "./EditTable";
import { updatePlayerData } from "./API/client";
import { Password } from 'primereact/password';

const PasswordContainerStyle = styled.div`
  margin-top: 7rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around
  `
  
  const PasswordInputStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
`

const Button = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`

const Styles = styled.div`
  padding: 1rem .5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  table {
    width: 75%;
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

function EditPlayerRank() {
  const columns = React.useMemo(
    () => [
      {
        Header: "MH TOP 169",
        columns: [
          {
            Header: "",
            accessor: "row_idn",
          },
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

  const [value, setValue] = React.useState('');
  const [isAuthenticated, setAuthenticated] = React.useState(false);
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

  function setFieldValue() {
    const match = value === process.env.REACT_APP_PASSWORD;
    if (match) {
      setAuthenticated(true);
    }
  }

  return (
    <div>
      {isAuthenticated ? (
        <Styles>
          {isLoading ? (
            <h1>Loading Player Data...</h1>
          ) : (
            <EditTable
              columns={columns}
              data={data}
              setData={setData}
              updatePlayers={updatePlayers}
            />
          )}
        </Styles>
      ) : (
        <PasswordContainerStyle>
          <PasswordInputStyle>
            <h3>Enter Password</h3>
            <Password value={value} onChange={(e) => setValue(e.target.value)} toggleMask />
            <Button onClick={setFieldValue}>ENTER</Button>
          </PasswordInputStyle>
        </PasswordContainerStyle>
      )}
    </div>
  );
}

export default EditPlayerRank;
