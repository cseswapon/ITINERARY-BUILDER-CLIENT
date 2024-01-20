import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
      <>
        <Link to="/">Home</Link><br /><br />
        <Link to="/addinfo">Add Info</Link><br /><br />
        <Link to="/alldata">All Data</Link><br /><br />
      </>
    );
};

export default Navbar;