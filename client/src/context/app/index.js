import React from 'react'

export * from './actions'
export * from './reducer'

export const initialState = {
  web3: null,
  contract: null,
  accounts: null,
}

export const AppContext = React.createContext({
  state: initialState,
  dispatch: () => {}
})

