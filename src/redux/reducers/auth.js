const initialState = {
    isLogedin: false,
    isLoading: false,
    id: '',
    name: '',
    about: '',
    email: '',
    avatar: '',
    token: '',
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
        const { id, name, email, about, avatar, token} = result
        if (success) {
          return {
            ...state,
            isLoading: false,
            isError: false,
            id,
            token,
            name,
            email,
            avatar,
            about,
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
        const { success, message } = action.payload.data;
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
      // UPDATE reducer
      case 'UPDATE_PENDING': {
        return {
          ...state,
          isLoading: true,
          isError: false,
          errMsg: '',
        };
      }
      case 'UPDATE_REJECTED': {
        return {
          ...state,
          isLoading: false,
          isError: true,
          errMsg: 'Something wrong, try again',
        };
      }
      case 'UPDATE_FULFILLED': {
        const { success, message, result } = action.payload.data;
        const { name, about } = result
        if (success) {
          return {
            ...state,
            isLoading: false,
            isError: false,
            name,
            about,
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
      case 'LOGOUT': {
        return {
          ...state,
          isLogedin: false,
          isLoading: false,
          id: '',
          name: '',
          about: '',
          email: '',
          avatar: '',
          token: '',
          errMsg: '',
          isError: false,
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
  
  export default auth