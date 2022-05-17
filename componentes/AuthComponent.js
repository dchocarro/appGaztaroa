import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { StyleSheet, Button, Text, View, Image } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import NetInfo from '@react-native-community/netinfo';

WebBrowser.maybeCompleteAuthSession();

export default function Auth() {

  const [accessToken, setAccessToken] = React.useState();
  const [userInfo, setUserInfo] = React.useState();
  const [netInfo, setNetInfo] = React.useState('');

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '271155907458-ecs7iprc9cafson12d01ha5r11k4bpbd.apps.googleusercontent.com'
  });

  async function getUserData() {
    let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    userInfoResponse.json().then(data => {
      setUserInfo(data);
    });
  }

  const getNetInfo = () => {
    // To get the network state once
    NetInfo.fetch().then((state) => {
      alert(
        `Connection type: ${state.type}
        Is connected?: ${state.isConnected}
        IP Address: ${state.details.ipAddress}`,
      );
    });
  };

  function showUserInfo() {

    if (userInfo) {
      return (
        <View>
          <Image source={{ uri: userInfo.picture }} style={styles.profilePic} />
          <Text>{"\n\n"}
            ¡Has iniciado sesión correctamente!{"\n\n"}
            {userInfo.name}{"\n\n"}
            {userInfo.email}{"\n\n"}
            Información sobre la red pulsando el ícono
          </Text>
          <Icon
          raised 
          reverse
          name={'network-wifi'}
          type='materialicons'
          color = '#f23'
          onPress={getNetInfo}
          />
        </View>
      );
    }
  }

  React.useEffect(() => {
    if (response?.type === 'success') {
      setAccessToken(response.authentication.accessToken);
      const unsubscribe = NetInfo.addEventListener((state) => {
        setNetInfo(
          `Connection type: ${state.type}
          Is connected?: ${state.isConnected}
          IP Address: ${state.details.ipAddress}`,
        );
      });
      return () => {
        unsubscribe();
      }
    }
    
  }, [response]);

  return (
    <>
      <Card>
        <Card.Title>{accessToken ? "Sesión iniciada correctamente" : "Iniciar sesión en Google"} </Card.Title>
        <Card.Divider />
        {showUserInfo()}
        <Button
          disabled={!request}
          title={accessToken ? "Información sobre el usuario" : "Login"}
          onPress={accessToken ? getUserData : () => { promptAsync() }}
        />
      </Card>
    </>
  );
}

const styles = StyleSheet.create({
  profilePic: {
    width: 70,
    height: 70
  }
});