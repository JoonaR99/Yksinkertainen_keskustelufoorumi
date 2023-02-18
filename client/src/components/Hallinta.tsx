import React, { useState, useEffect } from "react";
import { Alert, Backdrop, Button, CircularProgress, Typography, ListItem, ListItemText, List, ListItemIcon, IconButton, Box, Stack} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Muokkaus from './Muokkaus';

interface Data{
    keskustelut : any[],
    dataHaettu : boolean,
    virhe : string
  }

const Hallinta: React.FC = (): React.ReactElement => {

    const [dialogiAuki, setDialogiAuki] = useState<boolean>(false);

    const [data, setData] = useState<Data>({
        keskustelut : [],
        dataHaettu : false,
        virhe : ""
    });

    const poista = async (id : number) : Promise<void> => {

        try {

            const yhteys = await fetch(`/api/kirjoitukset/${id}`, {
                method : "DELETE"
            });
      
            const poistettuKirjoitus = await yhteys.json();

      
           setData({
               ...data,
               dataHaettu : true,
               keskustelut : [...data.keskustelut.filter((kirjoitus) => kirjoitus.id !== poistettuKirjoitus.id)]
           });
      
          } catch (e : any) {
      
            setData({
              ...data,
              virhe : "Palvelimeen ei saada yhteyttä.",
              dataHaettu : true
            });
      
          }

    }


    const lisaaUusi = async (otsikko : string, kirjoittaja : string, sisalto : string) : Promise<void> => {

        try {

            const yhteys = await fetch("/api/kirjoitukset", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({
                    otsikko : otsikko,
                    sisalto : sisalto,
                    kirjoittaja : kirjoittaja
                })
            });
      
            const uusiKirjoitus = await yhteys.json();
      
           setData({
               ...data,
               dataHaettu : true,
               keskustelut : [...data.keskustelut, uusiKirjoitus]
           });
      
          } catch (e : any) {
      
            setData({
              ...data,
              virhe : "Palvelimeen ei saada yhteyttä.",
              dataHaettu : true
            });
      
          }

    }

    const haeKeskustelut = async (): Promise<void> => {

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
              virhe : "Palvelimeen ei saada yhteyttä.",
              dataHaettu : true
            });
      
          }
    };

    useEffect(() => {
        haeKeskustelut();
    }, []);

  return <>
            {(Boolean(data.virhe)) ? (
                <Alert severity="error">{data.virhe}</Alert>
            ) : data.dataHaettu ? (
                <List>
                
                {data.keskustelut.map((teksti: any, idx: number) => {
                    return (
                    <ListItem key={idx} sx={{ paddingTop: 2 }}>
                        <ListItemText primary={teksti.otsikko} />
                            <ListItemIcon>
                                    <IconButton onClick={() => { poista(Number(teksti.id)) }}>
                                        <DeleteIcon/>
                                </IconButton>
                            </ListItemIcon>
                        </ListItem>
                    );
                })}
                </List>
            ) : (
                <Backdrop open={true}>
                <   CircularProgress color="inherit" />
                </Backdrop>
            )}
            <Stack spacing={2} >
                <Button 
                    variant="contained"
                    onClick={() => { setDialogiAuki(true) }}
                >Lisää uusi kirjoitus</Button>
                <Button
                    variant="contained"
                    href='http://localhost:3000'
                    color="inherit"
                >Palaa takaisin</Button>
            </Stack>

            <Muokkaus dialogiAuki={dialogiAuki} setDialogiAuki={setDialogiAuki} lisaaUusi={lisaaUusi}/>

        </>
};

export default Hallinta;