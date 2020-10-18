import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Orphanages from './pages/OrphanagesMap'
import OrphanagesDetails from './pages/OrphanagesDatails'

import SelectMapPosition from './pages/CreateOrphanage/SelectMapPosition'
import OrphanageData from './pages/CreateOrphanage/OrphanageData'
import Header from './components/Header'
import OrphanagesMap from './pages/OrphanagesMap'


const {Navigator, Screen} = createStackNavigator();


export default function Routes(){
    return (
        <NavigationContainer>
            {/* headerShown é o header da parte superior para mostrar o nome da página */}
            <Navigator screenOptions={{ headerShown: false, cardStyle: {backgroundColor: '#f2f3f5'}}}>
                <Screen 
                    name="Orphanages" 
                    component={Orphanages}
                />
                <Screen
                    name="OrphanagesMap"
                    component={OrphanagesMap}
                    options={{
                        headerShown: true,
                        header: () => <Header showCancel={false} title="Orfanato" />
                    }}
                />
                <Screen
                    name="OrphanagesDetails"
                    component={OrphanagesDetails}
                    options={{
                        headerShown: true,
                        header: () => <Header showCancel={false} title="Orfanato" />
                    }}
                />
                <Screen
                    name="SelectMapPosition"
                    component={SelectMapPosition}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Selecione no map" />
                    }}
                />
                <Screen
                    name="OrphanageData"
                    component={OrphanageData}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Informe os dados" />
                    }}
                />
            </Navigator>
        </NavigationContainer>
    )
}