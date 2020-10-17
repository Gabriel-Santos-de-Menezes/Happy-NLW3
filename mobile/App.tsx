import React from 'react';
import { useFonts} from 'expo-font'
import { Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold} from '@expo-google-fonts/nunito';

import Routes from './src/routes'

export default function App() {
  //Retorna true ou false para saber se as fontes foram carregadas
  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
    nunito700: Nunito_700Bold,
    Nunito_800ExtraBold,
  });
  if(!fontsLoaded){
    return null;
  }

  return (
    <Routes />
  );
}

