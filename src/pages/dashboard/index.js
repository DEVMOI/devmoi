import DashboardLayout from '../../components/DashboardLayout';
import DevInput from '../../components/DevInput';
function Dashboard(params) {
  return (
    <DashboardLayout isFluid={true} classes="h-100 w-100">
      <div className="d-flex flex-column">
        <h1>Welcome to the Dashbord...</h1>
        <div className="d-flex flex-column p-4 pb-5 border border-dark">
          <p className="m-0">Login</p>
          <DevInput
            id="email"
            type="email"
            label={'Email: '}
            placeholder="email@email.com"
            containerStyle="d-flex flex-column"
            labelStyle="py-3"
          />
          <DevInput
            id="password"
            type="password"
            label={'Password: '}
            placeholder="password"
            containerStyle="d-flex flex-column"
            labelStyle="py-3"
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
export default Dashboard;
