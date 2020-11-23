import { useRouter } from 'next/router';

function NavItem(props) {
  const router = useRouter();
  const handleClick = (e) => {
    e.preventDefault();
    router.push(props.Route,);
  };
  return (
    <li className="nav-item d-flex flex-row mx-3">
      <style jsx>
        {
          `
          .nav-item{
            cursor:pointer
          }
          `
        }
      </style>
      <a className="nav-link" onClick={handleClick}>
        {props.Text}
      </a>
    </li>
  );
}
export default NavItem;
