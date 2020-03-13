import { useState, useEffect } from "react";
import moifetch from "moifetch";

export async function getStaticProps() {
  const data = null;

  return {
    props: {
      data
    }
  };
}
export default ({ maintainer }) => {
  const [npmData, setData] = useState({});
  useEffect(() => {});
  return (
    <div className="container">
      <h3>Projects</h3>
    </div>
  );
};
