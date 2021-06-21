import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import "./loadingComponent.css"

interface ILoadingComponent {
    inverted?: boolean;
    content?: string;
}

export const LoadingComponent: React.FC<ILoadingComponent> = ({ inverted = true, content = 'Loading...' }) => {
    return (
        <Dimmer active={true} inverted={inverted}>
            <Loader content={content} size='large' className='loader-color' />
        </Dimmer>
    )
}