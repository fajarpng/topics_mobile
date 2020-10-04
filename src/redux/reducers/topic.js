const initialState = {
    isLoading: false,
    data: {},
    detail: [],
    errMsg: '',
    isError: false,
  }
  
  const topic = (state=initialState, action) => {
    switch(action.type){
      // GETTOPIC reducer
      case 'GETTOPIC_PENDING': {
        return {
          ...state,
          isLoading: true,
          isError: false,
          errMsg: '',
        };
      }
      case 'GETTOPIC_REJECTED': {
        return {
          ...state,
          isLoading: false,
          isError: true,
          errMsg: 'Something wrong, try again',
        };
      }
      case 'GETTOPIC_FULFILLED': {
        const { success, message, result } = action.payload.data;
        if (success) {
          return {
            ...state,
            isLoading: false,
            isError: false,
            data: result,
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
      // GETTOPIC reducer
      case 'DEAIL_PENDING': {
        return {
          ...state,
          isLoading: true,
          isError: false,
          errMsg: '',
        };
      }
      case 'DEAIL_REJECTED': {
        return {
          ...state,
          isLoading: false,
          isError: true,
          errMsg: 'Something wrong, try again',
        };
      }
      case 'DEAIL_FULFILLED': {
        const { success, message, result } = action.payload.data;
        if (success) {
          return {
            ...state,
            isLoading: false,
            isError: false,
            detail: result,
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
      // ASK reducer
      case 'ASK_PENDING': {
        return {
          ...state,
          isLoading: true,
          isError: false,
          errMsg: '',
        };
      }
      case 'ASK_REJECTED': {
        return {
          ...state,
          isLoading: false,
          isError: true,
          errMsg: 'Something wrong, try again',
        };
      }
      case 'ASK_FULFILLED': {
        const { success, message } = action.payload.data;
        if (success) {
          return {
            ...state,
            isLoading: false,
            isError: false,
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
      // DELETE reducer
      case 'DELETE_PENDING': {
        return {
          ...state,
          isLoading: true,
          isError: false,
          errMsg: '',
        };
      }
      case 'DELETE_REJECTED': {
        return {
          ...state,
          isLoading: false,
          isError: true,
          errMsg: 'Something wrong, try again',
        };
      }
      case 'DELETE_FULFILLED': {
        const { success, message } = action.payload.data;
        if (success) {
          return {
            ...state,
            isLoading: false,
            isError: false,
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