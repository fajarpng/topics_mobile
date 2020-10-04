const initialState = {
    isLoading: false,
    comment: [],
    errMsg: '',
    isError: false,
  }
  
  const topic = (state=initialState, action) => {
    switch(action.type){
      // GET reducer
      case 'GET_PENDING': {
        return {
          ...state,
          isLoading: true,
          isError: false,
          errMsg: '',
        };
      }
      case 'GET_REJECTED': {
        return {
          ...state,
          isLoading: false,
          isError: true,
          errMsg: 'Something wrong, try again',
        };
      }
      case 'GET_FULFILLED': {
        const { success, message, result } = action.payload.data;
        if (success) {
          return {
            ...state,
            isLoading: false,
            isError: false,
            data: result,
            errMsg: message,
            isLogedin: true
          }
        } else {
          return {
            ...state,
            isLoading: false,
            isError: true,
            errMsg: message || 'Something wrong, try again',
          }
        }
      }
      case 'CLEAR': {
        return {
          ...state,
          isLoading: false,
          errMsg: '',
          isError: false
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