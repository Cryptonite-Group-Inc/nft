import * as ActionTypes from './types'

export const reducer = (state, action) => {
  switch(action.type) {
    case ActionTypes.INIT_WALLET:
      return{
        ...state,
        web3: action.payload.web3,
        contract: action.payload.contract,
        accounts: action.payload.accounts
      }
    case ActionTypes.CONNECT_WALLET:
      return{
        ...state,
        web3: action.payload.web3,
        contract: action.payload.contract,
        accounts: action.payload.accounts
      }
      break
    case ActionTypes.UPDATE_ADDRESS:
      return {
        ...state,
        accounts: action.payload.accounts
      }
      break
    default:
      return state 
  }
}

