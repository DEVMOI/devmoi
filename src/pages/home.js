import {Layout} from "../components";
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
export default ({ data }) => {
  const [npmData, setData] = useState({});
  useEffect(() => {});
  return (
    <Layout>
      <div className="mt-3 row">
        <h3>Home</h3>
      </div>
    </Layout>
  );
};
