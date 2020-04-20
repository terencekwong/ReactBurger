import { useReducer, useCallback } from 'react';

const initialState = {
    loading: false, 
    error: null,
    data: null,
    extra: null,
    identifier: null
};

const httpReducer = (curhttpState, action) => {
    switch (action.type) {
      case 'SEND':
        return { loading: true, error: null, data: null, extra: null, identifier: action.identifier };
      case 'RESPONSE':
        return { ...curhttpState, loading: false, data: action.responseData,  extra: action.extra};
      case 'ERROR':
        return { loading: false, error: action.errorMessage };
      case 'CLEAR':
        return initialState;
      default: 
       throw new Error('should not get there!');
    }
  }

const useHttp = () => {
    const [ httpState, dispatchHttp] = useReducer(httpReducer, initialState);

    const clear = useCallback(() => dispatchHttp({ type: 'CLEAR' }), []);

    const sendRequest = useCallback((url, method, body, reqExtra, identifier) => {
        dispatchHttp({ type: 'SEND', identifier: identifier });
        fetch(url, {
            method: method,
            body: body,
            headers: {
                'Content-type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then(responseData => {
            dispatchHttp({ type: 'RESPONSE', responseData: responseData, extra: reqExtra})
        }).catch(error => {
            dispatchHttp({ type: 'ERROR', errorMessage: error.message });
        });
    }, []);

    return {
        isLoading: httpState.loading,
        data: httpState.data,
        error: httpState.error,
        sendRequest: sendRequest,
        reqExtra: httpState.extra,
        reqIdentifier: httpState.identifier,
        clear: clear
    }
};

export default useHttp;