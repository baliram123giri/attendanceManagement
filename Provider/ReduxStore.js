"use client";
import React from 'react'
import { Provider } from 'react-redux'
import QueryProvider from './QueryProvider'
import { store } from '@/redux/layoutReducer/strore';

const ReduxStore = ({ children }) => {
    return (
        <Provider store={store}>
            <QueryProvider > {children} </QueryProvider>
        </Provider>
    )
}

export default ReduxStore