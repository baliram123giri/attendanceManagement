"use client";
import React from 'react'
import { Provider } from 'react-redux'
import QueryProvider from './QueryProvider'
import { store } from '@/redux/layoutReducer/strore';
import { AuthContextProvider } from './contexApi/AuthContext';
import { ChatContexProvider } from './contexApi/ChatContext';

const ReduxStore = ({ children }) => {
    return (
        <Provider store={store}>
            <QueryProvider >
                <AuthContextProvider>
                    <ChatContexProvider>
                        {children}
                    </ChatContexProvider>
                </AuthContextProvider>
            </QueryProvider>
        </Provider>
    )
}

export default ReduxStore