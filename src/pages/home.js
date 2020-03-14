import { Layout } from "../components";
import { useState, useEffect } from "react";
import moifetch from "moifetch";

export async function getStaticProps() {
  const res = moifetch(
    "https://github.com/organizations/NodeGG/Moikapy.private.atom?token=AELYH7E3PYESPTOH4PKAOWV4PBDEQ"
  );
  const data = res;

  return {
    props: {
      data: JSON.stringify(data)
    }
  };
}
export default ({ data }) => {
  console.log(data)
  const [npmData, setData] = useState({});
  useEffect(() => {});
  return (
    <Layout classes="pt-3 h-100">
      <div>
        <h3>Annoucements:</h3>
      </div>
    </Layout>
  );
};
