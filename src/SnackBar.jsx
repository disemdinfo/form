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
      timer: this.props.timer,
    };
  }

  componentWillReceiveProps(nextProps: Object) {
    const { showSnackBar, timer } = this.state;
    if (showSnackBar !== nextProps.show) {
      this.setState({
        showSnackBar: nextProps.show,
        timer: nextProps.timer,
      }, () => {
        setTimeout(() => {
          this.setState({ showSnackBar: false });
          this.props.onHide();
        }, timer);
      });
    }
  }

  render() {
    const { showSnackBar } = this.state;

    const container = {
      position: 'fixed',
      left: '0px',
      bottom: '20px',
      width: '100%',
      WebkitTransition: 'translate 0.3s cubic-bezier(0, 0, 0.30, 1)',
      transition: 'translate 0.3s cubic-bezier(0, 0, 0.30, 1)',
      fontWeight: '500',
      textTransform: 'initial',
      willChange: 'transform',
      whiteSpace: 'nowrap',
      transform: 'translateY(20px)',
      WebkitTransform: 'translateY(20px)',
      fontSize: '14px',
      display: 'none',
      // opacity: 0,
      // display: '-webkit-box',
      // display: '-ms-flexbox',
      // display: 'flex',
      WebkitBoxAlign: 'center',
      msFlexAlign: 'center',
      alignItems: 'center',
      WebkitBoxPack: 'justify',
      msFlexPack: 'justify',
      justifyContent: 'space-between',
      lineHeight: '20px',
    };

    const snackbarStyle = {
      background: '#404040',
      marginLeft: 'auto',
      marginRight: 'auto',
      borderRadius: '3px',
      color: '#fff',
      paddingRight: '24px',
      paddingLeft: '24px',
      paddingTop: '24px',
      paddingBottom: '24px',
      textAlign: 'center',
      boxShadow: '0 0 2px rgba(0,0,0,.12), 0 2px 4px rgba(0,0,0,.24)',
      minWidth: 200,
    };

    if (showSnackBar) {
      container.display = 'flex';
      // container.opacity = 1;
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
}

SnackBar.propTypes = {
  show: PropTypes.bool,
  timer: PropTypes.number,
};

SnackBar.defaultProps = {
  timer: 3000,
  show: false,
};
