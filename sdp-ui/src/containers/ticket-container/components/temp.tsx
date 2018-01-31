
import React, { Component, PropTypes } from 'react'
import { DebugComponent } from '../../../components/debug-component';

// import { Component } from 'react';

    export class NativeAdsManager {
        constructor(placementId: string, numberOfAdsToRequest: number){

        }
    }

    export interface NativeAd {
        icon?: string;
        coverImage?: string;
        title?: string;
        subtitle?: string;
        decription?: string;
        callToActionText?: string;
        socialContext?: string;
    }

    interface IWithAd {
        nativeAd: NativeAd;
    }

    interface IWithManger {
        adsManager: NativeAd;
    }
    interface IProps  {
      myProp: number;
      nativeAd: NativeAd;
  }
  interface State {

  }
  class AdComponent extends React.Component<IWithAd, {}> {
      
      // public render() {
      //     return (
      //         <div>
      //         </div>
      //     );
      // }
  }
  export const withNativeAd1 = <TProps, TState>(WrappedComponent: React.ComponentClass<IWithAd> ): React.ComponentClass<IWithAd>  => {
    return class extends React.Component<IWithAd, TState> {
        render() {
            return (
                <WrappedComponent {...this.props} />
            )
        }
    }
}
    export function withNativeAd<T, S>(comp: Component<IWithAd, S>): any {
      return class extends React.Component<IWithAd, S> {
        // componentWillMount(){
        //     console.warn('mounting', WrappedComponent.displayName);
        // }
        render() {
            // console.warn('rendering', WrappedComponent.displayName, this.props);
            return (
                <div/>
            )
        }
    }
    }

    const f =  withNativeAd1( AdComponent);