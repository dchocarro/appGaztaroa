import * as ActionTypes from './ActionTypes';

export const favoritos = (state = { favoritos: [] }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_FAVORITO:
            if(state.favoritos.includes(action.payload)){
                return { ...state};
            }else{
                aux=state.favoritos.concat(action.payload);
                return { ...state, favoritos:aux, action: action.type };
            }
        case ActionTypes.POST_FAVORITO:
            return { ...state};
        default:
            return state;
    }
};