import React, { useState } from 'react';
import classNames from "classnames";

function Like () {
  const [liked, setLike] = useState(false);

  const handleLike = () => setLike(true);

  const heartIconClasses = classNames(
    'bi',
    { 'bi-heart': !liked },
    { 'bi-heart-fill': liked }
  );

  return (
    <>
      <td onClick={handleLike} style={{ cursor: 'pointer' }}>
        <i className={heartIconClasses} />
      </td>
    </>
  );
}

export default Like;