import { useState } from 'react';
import DMButton from '@/components/common/DMButton';
import UserIcon from '@/components/common/UserIcon';
import Layout from '@/components/Layout';
import RSSFeed from '@/components/RSSFeed';
import UserInfo from '@/components/UserInfo';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
const Home = (props) => {
  function HandleHomeContent() {
    return props.address.length !== 0 ? (
      <UserInfo address={props.address} />
    ) : (
      <div></div>
    );
  }

  return <div className="container-xl px-0 pt-3">{HandleHomeContent()}</div>;
};

const mapStateToProps = (state) => ({
  address: state.session.address,
});

export default connect(mapStateToProps)(Home);
