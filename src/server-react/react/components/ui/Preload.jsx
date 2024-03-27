import React from 'react';

import './_preload.scss';

const Preload = ({ load }) => {
  if (load) {
    return (
      <div className="preload">
        <div className="loadingio-spinner-rolling-8n6pm9bs3j5">
          <div className="ldio-gggn3pkm2yo">
            <div></div>
          </div>
        </div>
      </div>
    )
  }

  return null;
}

export default Preload;