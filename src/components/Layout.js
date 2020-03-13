import { useState, useEffect } from "react";

export default ({ classes, children }) => {
  const [npmData, setData] = useState({});
  useEffect(() => {});
  return (
    <div className={`container ${classes !== undefined ? classes : null}`}>
      {children}
    </div>
  );
};
