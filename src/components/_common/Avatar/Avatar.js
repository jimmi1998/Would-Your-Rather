import React from 'react';

const Avatar = ({ avatarUrl, height = 120, width = 120 }) => (<img
  height={height}
  width={width}
  src={require(`../../../assets/images/${avatarUrl}.png`)}
  alt="user avatar"
/>);

export default Avatar;
