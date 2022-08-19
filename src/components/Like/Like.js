import React, { useState } from 'react';
import classNames from "classnames";

function Like () {
  const [liked, setLike] = useState(false);

  const handleToggle = () => setLike(!liked);

  const heartIconClasses = classNames(
    'bi',
    { 'bi-heart': !liked },
    { 'bi-heart-fill': liked }
  );

  return (
    <>
      <span onClick={handleToggle}
            className="text-center"
            style={{ cursor: 'pointer' }}
      >
        <i className={heartIconClasses} />
      </span>
    </>
  );
}

export default Like;