import React from 'react';

const Loader = () => {
  return (
    <div className="spinner center">
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className="spinner-blade"></div>
      ))}
    </div>
  );
};

export default Loader;
