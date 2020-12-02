import { useRouter } from 'next/router';

function NavItem(props) {
  let { navItemStyle, navLinkStyle } = props;
  const router = useRouter();
  const handleClick = (e) => {
    e.preventDefault();
    router.push(props.Route);
  };
  return (
    <li
      className={`${
        navItemStyle !== undefined ? navItemStyle : ''
      } nav-item mx-3`}>
      <style jsx>
        {`
          .nav-item {
            cursor: pointer;
          }
        `}
      </style>
      <a
        className={`${navLinkStyle !== undefined ? navLinkStyle : ''} nav-link`}
        onClick={handleClick}>
        {props.Text}
      </a>
    </li>
  );
}
export default NavItem;
