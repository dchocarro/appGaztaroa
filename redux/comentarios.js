import * as ActionTypes from './ActionTypes';
import axios from 'axios';
import { baseUrl } from '../comun/comun';

export const comentarios = (state = { errMess: null, comentarios: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMENTARIOS:
      return { ...state, errMess: null, comentarios: action.payload };

    case ActionTypes.COMENTARIOS_FAILED:
      return { ...state, errMess: action.payload };

    case ActionTypes.ADD_COMENTARIO:

      const datos = {
        excursionId: action.payload.excursionId,
        valoracion: action.payload.valoracion,
        autor: action.payload.autor,
        comentario: action.payload.comentario,
        dia: action.payload.dia
      };
      axios.get(baseUrl + 'comentarios.json')
      .then((response) => {
        // console.log(response.data.length)
        axios.put(baseUrl + 'comentarios/'+response.data.length+'.json', datos)
        .then((response) => {
          alert('Comentario publicado!');
        }).catch(err => {
          alert(err);
        });
      }).catch(err => {
        alert(err);
      })
      


      aux = state.comentarios.concat(action.payload);
      // console.log(action.payload)
      return { ...state, errMess: null, comentarios: aux };

    default:
      return state;
  }
};