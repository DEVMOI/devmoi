export default ({ isFluid = false, classes, children }) => {
  return (
    <main>
      <div
        className={`${isFluid ? "container-fluid" : "container"} ${
          classes !== undefined ? classes : null
        }`}
      >
        {children}
      </div>
    </main>
  );
};
