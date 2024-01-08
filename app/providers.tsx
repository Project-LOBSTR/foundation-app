'use client'

import { PropsWithChildren } from 'react'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { persistor, store } from '@/redux/store'

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}
