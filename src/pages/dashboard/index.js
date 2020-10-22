import DashboardLayout from '../../components/DashboardLayout';

import LoginSection from '../../components/LoginSection';
function Dashboard(params) {
  return (
    <DashboardLayout isFluid={true} classes="h-100 w-100">
      <div className="d-flex flex-column">
        <h1>Welcome to the Dashbord...</h1>
        <LoginSection/>
      </div>
    </DashboardLayout>
  );
}
export default Dashboard;
