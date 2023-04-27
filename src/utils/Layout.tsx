import React, { ReactNode } from 'react';
import NavBar from '../components/navbar/NavBar';

function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <NavBar />
            {children}
        </>
    )
}
export default Layout