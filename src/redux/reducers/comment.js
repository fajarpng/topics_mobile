const initialState = {
    isLoading: false,
    comment: [],
    msg: '',
    isErr: false,
  }
  
  const topic = (state=initialState, action) => {
    switch(action.type){
      // GET reducer
      case 'GET_PENDING': {
        return {
          ...state,
          isLoading: true,
          isErr: false,
          msg: '',
        };
      }
      case 'GET_REJECTED': {
        return {
          ...state,
          isLoading: false,
          isErr: true,
          msg: 'Something wrong, try again',
        };
      }
      case 'GET_FULFILLED': {
        const { success, message, result } = action.payload.data;
        if (success) {
          return {
            ...state,
            isLoading: false,
            isErr: false,
            comment: result,
            isLogedin: true
          }
        } else {
          return {
            ...state,
            isLoading: false,
            isErr: true,
            msg: message || 'Something wrong, try again',
          }
        }
      }
      // EDIT reducer
      case 'EDIT_PENDING': {
        return {
          ...state,
          isLoading: true,
          isErr: false,
          msg: '',
        };
      }
      case 'EDIT_REJECTED': {
        return {
          ...state,
          isLoading: false,
          isErr: true,
          msg: 'Something wrong, try again',
        };
      }
      case 'EDIT_FULFILLED': {
        const { success, message } = action.payload.data;
        if (success) {
          return {
            ...state,
            isLoading: false,
            isErr: false,
            msg: message,
            isLogedin: true
          }
        } else {
          return {
            ...state,
            isLoading: false,
            isErr: true,
            msg: message || 'SSomething wrong, try again',
          }
        }
      }
      case 'CLEAR': {
        return {
          ...state,
          isLoading: false,
          msg: '',
          isErr: false
        }
      }
      default: {
        return {
          ...state
        }
      }
    }
  }
  
  export default topic