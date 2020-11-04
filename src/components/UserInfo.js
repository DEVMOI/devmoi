import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { EthAddress, Card } from 'rimble-ui';

import DMButton from '@/components/common/DMButton';
import UserIcon from '@/components/common/UserIcon';
import MoiText from './common/MoiText';

function UserInfo(props) {
  const [text, setText] = useState('');
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (submit) {
      setText('');
      setSubmit(false);
    }
  }, [submit]);

  ////
  const handleKeyPress = (event) =>
    event.key == 'Enter' ? setSubmit(true) : null;
  ///

  // const handleConversion = async () => {
  //   try {
  //     await window.ethereum.enable();
  //   } catch (err) {
  //     window.alert(
  //       'You need to install or enable Metamask for this demo to work.'
  //     );
  //   }

  //   const response = await fetch(
  //     `https://api.0x.org/swap/v1/quote?buyToken=DAI&sellToken=ETH&buyAmount=1`
  //   );
  //   if (response.ok) {
  //     let data = await response.json();
  //     web3.eth.sendTransaction(data, console.log);
  //   } else {
  //     const error = await response.json();
  //     document.getElementById('error').append(JSON.stringify(error, null, 2));
  //   }
  // };

  return (
    <div
      className={`d-flex flex-column ${
        props.userInfoContainerStyle !== undefined
          ? props.userInfoContainerStyle
          : ''
      }`}>
      <style global jsx>
        {`
          .user-info,
          .user-info > div {
            position: relative;
            width: 27.75rem;
            cursor: pointer;
          }
          .user-icon {
            width: 1.5625rem;
          }
        `}
      </style>
      <Card width={'auto'} maxWidth={'35.5rem;'}>
        <div className="d-flex flex-column">
          <div className="mx-auto mb-4">
            <UserIcon
              id="home-avatar"
              userIconStyle={'rounded-circle border border-dark mb-2'}
              scale={15}
            />
          </div>
          <EthAddress address={props.address} />
          <p className="h5 my-3 ml-1">
            <span className="font-weight-bold">ETH Balance:</span>{' '}
            {props.balance}
          </p>
          <div className="d-flex flex-row">
            <span className="mt-2 mr-3 text-uppercase">
              Do you want a Display Name?
            </span>
            <pre id="error" />
            <DMButton
              buttonStyle="btn-success px-3 mr-1"
              onPress={async (e) => {
                e.preventDefault();
                // alert('Adding Name');
                var ethUtil = require('ethereumjs-util');
                var sigUtil = require('eth-sig-util');
                var from = ethereum.selectedAddress;
                if (!from) return connect();
                await handleConversion();
                // let data;
                // data = JSON.stringify({
                //   types: {
                //     EIP712Domain: [
                //       { name: 'name', type: 'string' },
                //       { name: 'version', type: 'string' },
                //       { name: 'chainId', type: 'uint256' },
                //       {
                //         name: 'verifyingContract',
                //         type: 'address',
                //       },
                //     ],
                //     // Person: [
                //     //   { name: 'name', type: 'string' },
                //     //   { name: 'wallet', type: 'address' },
                //     // ],
                //     Message: [{ name: 'text', type: 'string' }],
                //   },
                //   primaryType: 'Message',
                //   domain: {
                //     name: 'DEVMOI',
                //     version: '1',
                //     chainId: ethereum.chainId,
                //     verifyingContract:
                //       '0xa8d145dd3003817da1dc83f838ee5088b65acf2e',
                //   },
                //   message: { text: 'You are Signing off Data' },
                // });
                // web3.eth.personal.sign(
                //   '\x19Ethereum Signed Message:\n' + data.length + data,
                //   from,
                //   '',
                //   function (err, result) {
                //     if (err) return console.dir(err);
                //     if (result.error) {
                //       alert(result.error.message);
                //     }
                //     if (result.error) return console.error('ERROR', result);
                //     console.log('TYPED SIGNED:' + JSON.stringify(result));
                //     console.log(result);
                //     const recovered = sigUtil.recoverTypedSignature({
                //       data: JSON.parse(data),
                //       sig: result,
                //     });

                //     if (
                //       ethUtil.toChecksumAddress(recovered) ===
                //       ethUtil.toChecksumAddress(from)
                //     ) {
                //       alert('Successfully ecRecovered signer as ' + from);
                //     } else {
                //       alert(
                //         'Failed to verify signer when comparing ' +
                //           result +
                //           ' to ' +
                //           from
                //       );
                //     }
                //   }
                // );
              }}>
              YES
            </DMButton>

            <DMButton
              buttonStyle="btn-danger px-3 ml-1"
              onPress={() => {
                alert(
                  'Option to add Display Name may be avaliable at a later date'
                );
              }}>
              NO
            </DMButton>
          </div>
        </div>
      </Card>
    </div>
  );
}
const mapStateToProps = (state) => ({
  address: state.session.address,
  balance: state.session.balance,
});

export default connect(mapStateToProps)(UserInfo);
