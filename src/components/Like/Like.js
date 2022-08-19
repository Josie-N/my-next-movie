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
      <td onClick={handleToggle}
          className="text-center"
          style={{ cursor: 'pointer' }}
      >
        <i className={heartIconClasses} />
      </td>
    </>
  );
}

export default Like;