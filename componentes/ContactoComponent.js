import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import * as MailComposer from 'expo-mail-composer';

async function sendEmailAsync() {
  let result = await MailComposer.composeAsync({
    recipients: ['gaztaroa@gaztaroa.com'],
    subject: '',
    body: '',
  });

  alert(result.status);
}

function RenderContacto() {

  return (
    <Card>
      <Card.Title>Contacto</Card.Title>
      <Card.Divider />
      <Text style={{ margin: 20 }}>
        Kaixo Mendizale!
        {"\n\n"}
        Si quieres participar en las salidas de montaña que organizamos o quieres hacerte soci@ de Gaztaroa, puedes contactar con nosotros a través de diferentes medios. Puedes llamarnos por teléfono los jueves de las semanas que hay salida (de 20:00 a 21:00). También puedes ponerte en contacto con nosotros escribiendo un correo electrónico, o utilizando la aplicación de esta página web. Y además puedes seguirnos en Facebook.
        Para lo que quieras, estamos a tu disposición!
        {"\n\n"}
        Tel: +34 948 277151
        {"\n\n"}
        Email: gaztaroa@gaztaroa.com
        {"\n\n"}
        ¡Envíanos un correo con tus dudas o sugerencias!
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: "center" }}>
        <Button title="Enviar correo" onPress={sendEmailAsync} />
      </View>
      
    </Card>
  );

}



class Contacto extends Component {

  render() {
    return (<RenderContacto/>);
  }
}

export default Contacto;