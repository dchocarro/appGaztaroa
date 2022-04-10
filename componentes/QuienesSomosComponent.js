import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { ListItem, Avatar } from 'react-native-elements';
import { SafeAreaView, FlatList } from 'react-native';
import { ACTIVIDADES } from '../comun/actividades';


function Historia() {

    return (
        <Card>
            <Card.Title>Un poquito de historia</Card.Title>
            <Card.Divider />
            <Text style={{ margin: 20 }}>
                El nacimiento del club de montaña Gaztaroa se remonta a la primavera de 1976 cuando jóvenes aficionados a la montaña y pertenecientes a un club juvenil decidieron crear la sección montañera de dicho club. Fueron unos comienzos duros debido sobre todo a la situación política de entonces. Gracias al esfuerzo económico de sus socios y socias se logró alquilar una bajera. Gaztaroa ya tenía su sede social.
                Desde aquí queremos hacer llegar nuestro agradecimiento a todos los montañeros y montañeras que alguna vez habéis pasado por el club aportando vuestro granito de arena.
                Gracias!

            </Text>
        </Card>
    );

}

function Lista() {

    return (
        <Card>
            <Card.Title>Un poquito de historia</Card.Title>
            <Card.Divider />
            <Text style={{ margin: 20 }}>
                El nacimiento del club de montaña Gaztaroa se remonta a la primavera de 1976 cuando jóvenes aficionados a la montaña y pertenecientes a un club juvenil decidieron crear la sección montañera de dicho club. Fueron unos comienzos duros debido sobre todo a la situación política de entonces. Gracias al esfuerzo económico de sus socios y socias se logró alquilar una bajera. Gaztaroa ya tenía su sede social.
                Desde aquí queremos hacer llegar nuestro agradecimiento a todos los montañeros y montañeras que alguna vez habéis pasado por el club aportando vuestro granito de arena.
                Gracias!

            </Text>
        </Card>
    );

}

class QuienesSomos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actividades: ACTIVIDADES
        };
    }

    render() {

        const { navigate } = this.props.navigation;

        const renderCalendarioItem = ({ item, index }) => {
            return (
                <ListItem
                    key={index}
                    // onPress={() => navigate('DetalleExcursion', { excursionId: item.id })}
                    bottomDivider>
                    <Avatar source={require('./imagenes/40Años.png')} />
                    <ListItem.Content>
                        <ListItem.Title>{item.nombre}</ListItem.Title>
                        <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            );
        };

        return (
            <>
                <ScrollView>
                    <Historia />
                    <Card>
                        <Card.Title>Actividades y recursos</Card.Title>
                        <Card.Divider />
                        {/* <FlatList
                            data={this.state.actividades}
                            renderItem={renderCalendarioItem}
                            keyExtractor={item => item.id.toString()}
                        /> */}
                        {this.state.actividades.map((item, index) => (
                            <ListItem
                                key={index}
                                // onPress={() => navigate('DetalleExcursion', { excursionId: item.id })}
                                bottomDivider>
                                <Avatar source={require('./imagenes/40Años.png')} />
                                <ListItem.Content>
                                    <ListItem.Title>{item.nombre}</ListItem.Title>
                                    <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
                                </ListItem.Content>
                            </ListItem>
                            ))}
                    </Card>
                </ScrollView>
            </>
        );
    }
}

export default QuienesSomos;
