// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';

type Props = {
  children: any,
  show: boolean,
  timer?: number
}

type State = {
  showSnackBar: boolean,
  timer: number
}

export default class SnackBar extends Component<Props, State> {
  constructor(props: Object) {
    super(props);
    this.state = {
      showSnackBar: this.props.show,
      timer: this.props.timer || 4000
    };
  }

  componentWillReceiveProps(nextProps: Object) {
    var {showSnackBar, timer} = this.state;
    if (showSnackBar !== nextProps.show) {
      this.setState({
        showSnackBar: nextProps.show,
        timer: nextProps.timer
      }, () => {
        setTimeout(() => {
          this.setState({ showSnackBar: false });
          this.props.onHide();
        }, timer);
      });
    }
  }

  render() {
    const { show } = this.props;
    const { showSnackBar } = this.state;
    console.log('showSnackBar', showSnackBar)
    const container = {
      position: 'fixed',
      left: '20px',
      bottom: '20px',
      width: '100%',
      background: '#404040',
      color: '#fff',
      padding: '14px',
      WebkitTransition: 'translate 0.3s cubic-bezier(0, 0, 0.30, 1)',
      transition: 'translate 0.3s cubic-bezier(0, 0, 0.30, 1)',
      fontWeight: '500',
      textTransform: 'initial',
      willChange: 'transform',
      whiteSpace: 'nowrap',
      transform: 'translateY(20px)',
      WebkitTransform: 'translateY(20px)',
      boxShadow: '0 0 2px rgba(0,0,0,.12), 0 2px 4px rgba(0,0,0,.24)',
      fontSize: '14px',
      opacity: 0,
      borderRadius: '3px',
      display: '-webkit-box',
      display: '-ms-flexbox',
      display: 'flex',
      WebkitBoxAlign: 'center',
      msFlexAlign: 'center',
      alignItems: 'center',
      WebkitBoxPack: 'justify',
      msFlexPack: 'justify',
      justifyContent: 'space-between',
      lineHeight: '20px',
      minWidth: 200      
    };

    const snackbarStyle = { 
        background: 'red', 
        marginLeft: 'auto', 
        marginRight: 'auto' 
    };

    if (showSnackBar) {
      container.opacity = 1;
      container.transform = 'translateY(0)';
    }

    return (
      <div style={container}>
            <div style={snackbarStyle}>
                {this.props.children}
            </div>
      </div>
    );
  }
};

SnackBar.propTypes = {
  show: PropTypes.bool.isRequired,
  timer: PropTypes.number
};
