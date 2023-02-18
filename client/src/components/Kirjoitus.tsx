import React, { useState, useEffect } from 'react';
import { Alert, Backdrop, Box, Button, CircularProgress, Link, Stack, Typography } from '@mui/material'; 
import { format, parseJSON } from 'date-fns';

interface Data{
  keskustelut : any[],
  dataHaettu : boolean,
  virhe : string
}

const Kirjoitus : React.FC = () : React.ReactElement => {

 const [data, setData] = useState<Data>({
                                      keskustelut : [],
                                      dataHaettu : false,
                                      virhe : ""
                                  });

  const haeKeskustelut = async () : Promise<void> => {

    try {

    const yhteys = await fetch("/api/kirjoitukset");

    const keskustelut = await yhteys.json();

    setData({
      ...data,
      keskustelut : keskustelut,
      dataHaettu : true
    });

    } catch (e : any) {

      setData({
        ...data,
        virhe : "Palvelimeen ei saada yhteyttä",
        dataHaettu : false
      })

    }

  }

  useEffect(() =>{
    haeKeskustelut();
  }, [])

  return (Boolean(data.virhe))
      ? <Alert severity="error">
          {data.virhe}
        </Alert>
      : (data.dataHaettu)
        ? <>
            {data.keskustelut.map((keskustelu : any, idx : number) => {
              return <Box key={idx} sx={{paddingTop : 2, paddingBottom : 1, paddingLeft : 2, marginTop : 1, border: '1px solid grey'}}> 
                        <Stack spacing={1} >
                          <Link variant='h5' underline="hover" href={`http://localhost:3000/sisalto/${keskustelu.id}`}> {keskustelu.otsikko}</Link>
                          <Typography variant='subtitle2'><span dangerouslySetInnerHTML={{__html : keskustelu.kirjoittaja}} /></Typography>
                          <Typography variant='body2'> {format(parseJSON(keskustelu.aikaleima), "dd.MM.yyyy HH.mm.ss")}</Typography>
                        </Stack>
                    </Box>
            })}
            <Button variant='contained' color="primary" href='http://localhost:3000/hallinta' sx={{marginTop : 1}} >Aloita uusi keskustelu</Button>
          </>
        : <Backdrop open={true}>
            <CircularProgress color="inherit"/>
          </Backdrop>  
          
}


export default Kirjoitus;