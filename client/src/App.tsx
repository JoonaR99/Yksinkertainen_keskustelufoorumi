import { Container, Typography } from '@mui/material';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Hallinta from './components/Hallinta';
import Kirjoitus from './components/Kirjoitus';
import Sisalto from './components/Sisalto';

const App : React.FC = () : React.ReactElement => {

  return (
    <Container>
      <Typography variant='h5'>Oppimistehtävä 7: Keskustelufoorumi</Typography>
      <Routes>
        <Route path="/" element={<Kirjoitus />}/>
        <Route path="/hallinta" element={<Hallinta />} />
        <Route path="/sisalto/:id" element={<Sisalto />} />
      </Routes>
    </Container>
  );
}

export default App;
