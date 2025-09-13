// src/withRouter.tsx
import React from 'react';
import { useNavigate, useLocation, Location } from 'react-router-dom';

// Define as props que serão injetadas no componente
export interface WithRouterProps {
    navigate: ReturnType<typeof useNavigate>;
    location: Location; // Usamos o tipo Location do react-router-dom
}

// Função de alta ordem (HOC) para injetar navigate e location
export function withRouter<T extends WithRouterProps>(Component: React.ComponentType<T>) {
    return (props: Omit<T, keyof WithRouterProps>) => {
        const navigate = useNavigate();
        const location = useLocation();
        return <Component {...(props as T)} navigate={navigate} location={location} />;
    };
}