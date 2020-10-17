import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { Feather} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'


interface HeaderProps{
    title: string;
    /* Propiedade opcional */
    showCancel?: boolean;
}

/* Pegando o título de cada página por props, e tipando a função para ser do tipo Header Props */
export default function Header( {title, showCancel = true}: HeaderProps){
    const navigation = useNavigation();

    //Redireciona para a página home quando clicar no ícone de X
    function handleGoBackToAppHomePage(){
        navigation.navigate('OrphanagesMap')
    }

    return (
        <View style={styles.container}>
            {/* Simula o botão nativo de cada dispositivo android ou IOS */}
            <BorderlessButton onPress={ navigation.goBack}>
                <Feather name="arrow-left" size={24} color='#15b6d6' />
            </BorderlessButton>

            <Text style={styles.title}>{title}</Text>

            {/* Se a propiedade shoCancel  que será passada pelo component pai
                 for false não irá mostrar o button de X no header,
            */}
            {  showCancel ? (
                <BorderlessButton onPress={ handleGoBackToAppHomePage}>
                <Feather name="x" size={24} color='#ff669d' />
            </BorderlessButton>
            ) : (
                /* Mostrar a view em vez de Null para o title ficar centralizado */
                <View />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#f9fafc',
        borderBottomWidth: 1,
        borderColor: '#dde3f0',
        paddingTop: 44,
        
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
    },

    title: {
        fontFamily: 'Nunito_600SemiBold',
        color: '#8fa7b3',
        fontSize: 16,

    }
})