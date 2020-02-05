import React, { useState, useEffect, useRef } from 'react';

import './Filter.css';

const Filter = props => {
  const [data, setData] = useState();
  const inputRef = useRef();
  const { filter } = props;

  useEffect(() => {
    filter(data);
  }, [data]);

  return (
    <div className="center">
      <input
        id={props.id}
        type="text"
        placeholder={"Filtre os membros pelo login"}
        onChange={event => setData(event.target.value)}
        value={data}
        ref={inputRef}
        className="center"
      />
    </div>
    
  );
};

export default Filter;
