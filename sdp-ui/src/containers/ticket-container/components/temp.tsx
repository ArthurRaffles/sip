
import React, { Component, PropTypes } from 'react'
import { DebugComponent } from '../../../components/debug-component';

    interface IProps  {
      counter: number;
  }

  interface MarkerProps {
    position: {
      lat: number, long: number
    },
    onClick: (object: any) => void;

  }
  class Marker extends React.Component<MarkerProps, {} > {
    render() {
      const { onClick } = this.props;
      return (
        <div onClick={onClick} />
      )
    }
  }
  class MyComponent extends React.Component<IProps, {}> {
      
      public render() {
          return (
              <div>
              </div>
          );
      }
  }
  