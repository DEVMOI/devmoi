import { useState, useEffect } from 'react';
import moifetch from 'moifetch';
import { Layout } from '../components';
export async function getStaticProps() {
  const data = null;

  return {
    props: {
      data,
    },
  };
}
const projects = ({ maintainer }) => {
  const [npmData, setData] = useState({});
  useEffect(() => {});
  return (
    <Layout classes="mt">
      <h3>Projects</h3>
      Links Coming Soon...
    </Layout>
  );
};
export default projects;
