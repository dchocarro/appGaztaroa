import React, { Component } from 'react';
import { useState } from 'react';
import { Modal, Text, View, ScrollView, FlatList, Alert, StyleSheet, Pressable, Input, TextInput } from 'react-native';
import { Card, Icon, Rating } from 'react-native-elements';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';
import { postFavorito, postComentario } from '../redux/ActionCreators';

// import { Rating } from 'react-native-ratings';

const mapStateToProps = state => {
  return {
    comentarios: state.comentarios,
    excursiones: state.excursiones,
    favoritos: state.favoritos
  }
}
const mapDispatchToProps = dispatch => ({
  postFavorito: (excursionId) => dispatch(postFavorito(excursionId)),
  postComentario: (comentario) => dispatch(postComentario(comentario))
})

function RenderExcursion(props) {

  const excursion = props.excursion;
  const [modalVisible, setModalVisible] = useState(false)

  if (excursion != null) {
    return (
      <Card>
        <Card.Title>{excursion.nombre}</Card.Title>
        <Card.Divider />
        <Card.Image source={{ uri: baseUrl + excursion.imagen }}></Card.Image>
        <Text style={{ margin: 20 }}>
          {excursion.descripcion}
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: "center" }}>
          <Icon
            raised
            reverse
            name={props.favorita ? 'heart' : 'heart-o'}
            type='font-awesome'
            color='#f50'
            onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()}
          />
          <Icon
            raised
            reverse
            name={props.newcoment ? 'Pencil' : 'pencil'}
            type='font-awesome'
            color='#f47'
            // onPress={() => false ? console.log('True') : console.log('False')}
            onPress={() => setModalVisible(true)}
          />
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Rating
                  showRating
                  onFinishRating={(value) => { props.estado.valoracion = value  }}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: "center" }}>
                  <Icon
                    raised
                    reverse
                    name='user'
                    type='font-awesome'
                    color='#f50'
                  //onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Autor o autora"
                    onChangeText={(searchString) => { props.estado.autor = searchString }}
                    underlineColorAndroid="transparent"
                  />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: "center" }}>
                  <Icon
                    raised
                    reverse
                    name='message'
                    color='#f50'
                  //onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Comentario"
                    onChangeText={(searchString) => {  props.estado.comentario = searchString  }}
                    underlineColorAndroid="transparent"
                  />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: "center" }}>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {props.mandar(),setModalVisible(false)}}
                  >
                    <Text style={styles.textStyle}>Mandar</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Cancelar</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>

      </Card>
    );
  }
  else {
    return (<View></View>);
  }
}

function RenderComentario(props) {

  const comentarios = props.comentarios;

  const renderCommentarioItem = ({ item, index }) => {

    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comentario}</Text>
        <Text style={{ fontSize: 12 }}>{item.valoracion} Stars</Text>
        <Text style={{ fontSize: 12 }}>{'-- ' + item.autor + ', ' + item.dia} </Text>
      </View>
    );
  };

  return (
    <Card>
      <Card.Title>Comentarios</Card.Title>
      <Card.Divider />
      {/* <FlatList
        data={comentarios}
        renderItem={renderCommentarioItem}
        keyExtractor={item => item.id.toString()}
      /> */}
      {comentarios.map((item, index) => (
        <View key={index} style={{ margin: 10 }}>
          <Text style={{ fontSize: 14 }}>{item.comentario}</Text>
          <Text style={{ fontSize: 12 }}>{item.valoracion} Stars</Text>
          <Text style={{ fontSize: 12 }}>{'-- ' + item.autor + ', ' + item.dia} </Text>
        </View>
      ))}
    </Card>
  );
}




class DetalleExcursion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      excursionId: this.props.route.params.excursionId,
      valoracion: 3,
      autor: '',
      comentario: '',
      dia: new Date()
    }
  }

  resetForm() {
    this.setState({
      excursionId: this.props.route.params.excursionId,
      valoracion: 3,
      autor: '',
      comentario: '',
      dia: new Date
    })
  }

  marcarFavorito(excursionId) {
    // this.setState({ favoritos: this.state.favoritos.concat(excursionId) });
    this.props.postFavorito(excursionId);
  }

  mandarComentario() {

    this.props.postComentario(this.state);
    this.resetForm()
  }

  render() {
    const { excursionId } = this.props.route.params;
    return (
      <>
        <ScrollView>
          <RenderExcursion
            excursion={this.props.excursiones.excursiones[+excursionId]}
            favorita={this.props.favoritos.favoritos.some(el => el === excursionId)}
            onPress={() => this.marcarFavorito(excursionId)}
            mandar={() => this.mandarComentario()}
            estado={this.state}
          />
          <RenderComentario
            comentarios={this.props.comentarios.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
          />

        </ScrollView>
      </>
    );

  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);