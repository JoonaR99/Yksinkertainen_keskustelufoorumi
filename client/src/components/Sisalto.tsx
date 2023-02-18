import React, { useState, useEffect } from 'react';
import { Alert, Backdrop, Button, CircularProgress, Typography } from '@mui/material'; 
import { useParams } from 'react-router-dom';

interface Data{
  keskustelu : any,
  dataHaettu : boolean,
  virhe : string
}

const Sisalto : React.FC = () : React.ReactElement => {

 const [data, setData] = useState<Data>({
                                      keskustelu : {},
                                      dataHaettu : false,
                                      virhe : ""
                                  });
  const { id } = useParams();

  const haeKeskustelu = async (id? : number) : Promise<void> => {

    try {

    const yhteys = await fetch(`/api/kirjoitukset/${id}`);

    const keskustelu = await yhteys.json();

    setData({
      ...data,
      keskustelu : keskustelu,
      dataHaettu : true
    });

    } catch (e : any) {

      setData({
        ...data,
        virhe : "Palvelimeen ei saada yhteyttä",
        dataHaettu : false
      });
    }
  }

  useEffect(() =>{
    haeKeskustelu(Number(id));
  }, [])

  return (Boolean(data.virhe))
      ? <Alert severity="error">
          {data.virhe}
        </Alert>
      : (data.dataHaettu)
        ? <> 
            <Typography variant='subtitle2'><span dangerouslySetInnerHTML={{__html : JSON.stringify(data.keskustelu.sisalto)}} /></Typography>
            <Button variant='contained' color="primary" href='http://localhost:3000' sx={{marginTop : 1}} >Palaa takaisin</Button>
          </>
        : <Backdrop open={true}>
            <CircularProgress color="inherit"/>
          </Backdrop>  
}

export default Sisalto;