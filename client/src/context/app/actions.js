import * as ActionTypes from './types'

export const connectWallet = (web3, contract, accounts) => {
  return {
    type: ActionTypes.CONNECT_WALLET,
    payload: {
      web3,
      contract,
      accounts
    }
  }
}

export const initWallet = (web3, contract, accounts) => {
  return {
    type: ActionTypes.INIT_WALLET,
    payload: {
      web3,
      contract,
      accounts
    }
  }
}

export const updateAccounts = (accounts) => {
  return {
    type: ActionTypes.UPDATE_ADDRESS,
    payload: {
      accounts
    }
  }
}