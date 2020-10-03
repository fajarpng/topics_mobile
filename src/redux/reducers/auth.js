const initialState = {
    isLogedin: false,
    isLoading: false,
    data: {},
    errMsg: '',
    isError: false,
  }
  
  const auth = (state=initialState, action) => {
    switch(action.type){
      // LOGIN reducer
      case 'LOGIN_PENDING': {
        return {
          ...state,
          isLoading: true,
          isError: false,
          errMsg: '',
        };
      }
      case 'LOGIN_REJECTED': {
        return {
          ...state,
          isLoading: false,
          isError: true,
          errMsg: 'Something wrong, try again',
        };
      }
      case 'LOGIN_FULFILLED': {
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
      // REGIS reducer
      case 'REGIS_PENDING': {
        return {
          ...state,
          isLoading: true,
          isError: false,
          errMsg: '',
        };
      }
      case 'REGIS_REJECTED': {
        return {
          ...state,
          isLoading: false,
          isError: true,
          errMsg: 'Something wrong, try again',
        };
      }
      case 'REGIS_FULFILLED': {
        const { success, message, result } = action.payload.data;
        if (success) {
          return {
            ...state,
            isLoading: false,
            isError: false,
            errMsg: message,
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
      case 'LOGOUT': {
        return {
          ...state,
          isLogedin: false,
          isLoading: false,
          data: {},
          errMsg: '',
          isError: false,
        }
      }
      case 'CLEAR': {
        return {
          ...state,
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
  
  export default auth