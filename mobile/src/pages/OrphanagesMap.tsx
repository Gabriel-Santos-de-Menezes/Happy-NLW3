import React from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Callout, Marker } from 'react-native-maps'
import { Feather } from '@expo/vector-icons'

import mapMarker from '../images/map-marker.png'
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

export default function OrphanagesMap(){
    const navigation = useNavigation();

    function handleNavigationToOrphanageDetails(){
        navigation.navigate('OrphanagesDetails')
    }

    function handleNavigationToCreateOrphanage(){
        navigation.navigate('SelectMapPosition')
    }

    return (
        <View style={styles.container}>
      <MapView 
        provider={PROVIDER_GOOGLE}
        style={styles.container} 
        initialRegion={{
          latitude: -22.2768972,
          longitude: -51.5081125,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}>
          <Marker  
            icon={mapMarker}
            calloutAnchor={{
              x: 2.7,
              y: 0.8,
            }}
            coordinate={{
              latitude: -22.2768972,
              longitude: -51.5081125,
            }}
          >
            <Callout tooltip={true} onPress={handleNavigationToOrphanageDetails}>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>Lar das meninas</Text>

              </View>
            </Callout>
          </Marker>
        </MapView>

        <View style={styles.footer}>
            <Text style={styles.footerText}>2 orfanatos encontrados</Text>
            {/* Botão que perde opacidade quando clica */}
            <RectButton style={styles.createOrphanageButton} onPress={handleNavigationToCreateOrphanage}>
              <Feather name="plus" size={20} color="#fff"/>
            </RectButton>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      
    },
  
    map:{
      /* Pegar tamanho da tela */
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  
    calloutContainer: {
      width: 160,
      height: 46,
      paddingHorizontal: 16,
      backgroundColor: 'rgba(255,255,255, 0.8)',
      borderRadius: 16,
      justifyContent: 'center',
    },
  
    calloutText: {
      color: '#0089a5',
      fontSize: 14,
      fontFamily: 'nunito700'
    },
  
    footer: {
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 24,
  
      backgroundColor: '#fff',
      borderRadius: 20,
      height: 46,
      paddingLeft: 24,
  
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  
      elevation: 3,
    },
  
    footerText: {
      fontFamily: 'nunito700',
      color: '#8fa7b3',
    },
  
    createOrphanageButton: {
      width: 56,
      height: 56,
      backgroundColor: '#15c3d6',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    }
  
  });
  