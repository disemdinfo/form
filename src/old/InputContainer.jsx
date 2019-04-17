import React from 'react';

const defaultStyle = {
  // marginTop: 12,
  // marginRight: 4,
  label: {
    container: {
      height: 18,
    },
    color: 'rgba(0, 0, 0, 0.42)',
  },
};

const Label = ({ children, id }) => (
  <div style={defaultStyle.label.container}>
    <label htmlFor={id} style={defaultStyle.label}>{children}</label>
  </div>
);

const Container = ({ children, id, label, style }) => (
  <div style={{ ...defaultStyle, ...style }}>
    <Label id={id}>{label}</Label>
    {children}
  </div >
);


Container.defaultProps = {
};

export default Container;
