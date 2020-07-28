import Layout from "../components/Layout";

export default () => {

const Landing= () => {

  return (
    <Layout isFluid={true} classes="container-fluid h-100 border border-dark">
      <style jsx>{``}</style>
      <style global jsx>{`
        html {
          height: 100% !important;
        }
      `}</style>
      <div className="d-flex flex-column align-items-center justify-content-center mx-auto h-100">
        <h1 className="display-3">DEVMOI</h1>
        <h5>A Community of Developers and Creators.</h5>

        <br />
        <a className="mb-4" href="https://discord.gg/DnbkrC8" target="_blank">
          <img
            className="border border-dark"
            src="https://img.shields.io/discord/687169639712686097?style=for-the-badge&logo=discord"
            alt="Discord Icon"
          />
        </a>

        <a
          className="btn btn-outline-dark text-uppercase"
          onClick={() => {
            window.location.pathname = '/home';
          }}>
          enter
        </a>
      </div>
    </Layout>
  );
};
export default Landing;