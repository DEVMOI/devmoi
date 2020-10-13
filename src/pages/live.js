import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import TwitchVideo from '@/components/TwitchVideo';
function Live(props) {
const isDev = process.env.NODE_ENV === 'development';
useEffect(()=>{})  
return (
    <Layout isFluid classes={'js-live mt-5'}>
      
      {/* <!-- Add a placeholder for the Twitch embed --> */}
      {isDev ? (
        <TwitchVideo/>
      ) : (
        <div>Under Construction...</div>
      )}
    </Layout>
  );
}
export default Live;
