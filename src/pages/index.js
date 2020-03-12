import { useEffect } from "react";
export default () => {
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    window !== undefined
      ? window.location.pathname == "/"
        ? document.querySelector(".navbar").classList.add("d-none")
        : null
      : null;
  });

  return (
    <div className="container-fluid h-100 border border-dark">
      <style jsx>{``}</style>
      <style global jsx>{`
        html {
          height: 100% !important;
        }
      `}</style>
      <div className="d-flex flex-column align-items-center justify-content-center mx-auto h-100">
        <h1 className="display-3">DEVMOI</h1>
        <h5>A Community Driven resource for developers.</h5>
        <p className="lead">
          Join us:
          <br />
          <a href="https://discord.gg/DnbkrC8" target="_blank">
            <img
              className="border border-dark"
              src="https://img.shields.io/discord/687169639712686097?style=for-the-badge&logo=discord"
              alt="Discord Icon"
            />
          </a>
        </p>
        <a
          className="btn btn-outline-dark"
          onClick={() => {
            window.location.pathname = "/guides";
          }}
        >
          Get Started
        </a>
      </div>
    </div>
  );
};
