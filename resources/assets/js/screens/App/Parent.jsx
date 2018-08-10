import React from 'react';
import AuthLogOutBtn from '../../components/Auth/LogOutBtn/LogOutBtn';

const AppParent = (props) => {
  return (
    <div>
      AppParent area
      <AuthLogOutBtn />
      {props.children}  {/* RENDER ROUTES NESTED TO THE COMPONENT IN Root.jsx */}
    </div>
  );
}

export default AppParent;
