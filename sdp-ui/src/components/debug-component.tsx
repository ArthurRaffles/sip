import * as React from 'react';

export const DebugComponent = <TProps, TState>(WrappedComponent: React.ComponentClass<TProps> ): React.ComponentClass<TProps>  => {
    return class extends React.Component<TProps, TState> {
        componentWillMount(){
            console.warn('mounting', WrappedComponent.displayName);
        }
        render() {
            console.warn('rendering', WrappedComponent.displayName, this.props);
            return (
                <WrappedComponent {...this.props} />
            )
        }
    }
}
// export DebugComponent;

