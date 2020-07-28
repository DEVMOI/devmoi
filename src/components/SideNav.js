export default function SideNav(props) {
  return (
    <div className="d-flex flex-column px-3 pt-5 mr-3 border border-dark side-nav">
      <style jsx>
        {`
          .side-nav {
            z-index: 3;
            background-color: #fff;
            width: 7rem;
            height: 100%;
          }
          .side-nav a,
          .side-nav a:hover {
            color: #000;
          }
        `}
      </style>
      <div className=" border-right-0 border-left-0 border-dark">
        <a href="/dashboard">Home</a>
      </div>
      <div className=" border-right-0 border-left-0 border-dark">
        <a href="/settings">Settings</a>
      </div>
    </div>
  );
}
