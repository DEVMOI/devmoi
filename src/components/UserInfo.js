import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
// import TextEditor from '@/components/common/TextEditor';
import DMButton from '@/components/common/DMButton';
import UserIcon from '@/components/common/UserIcon';
import MoiText from './common/MoiText';

function UserInfo(props) {
  const [copy, setCopy] = useState('');
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
  const copyclip = (item) => {
    var textField = document.createElement('textarea');
    textField.innerText = item;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    setCopy({ copy: 'Copied' });
    textField.remove();
    setTimeout(() => {
      setCopy({ copy: '' });
    }, 1000);
  };
  ////
  return (
    <div className="user-info d-flex flex-column">
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
          .copy-text {
            color: green;
            position: absolute;
            right: 0.375rem;
            top: 0.1875rem;
            bottom: auto;
          }
        `}
      </style>

      <div className="d-flex flex-column p-3 border border-dark">
        <div
          onClick={(e) => copyclip(props.address)}
          className="d-flex flex-row">
          <UserIcon id="home-avatar" userIconStyle={'user-icon'} />
          <span className="mt-2 ml-3">{props.address}</span>
        </div>
        <div>
          <span className="font-weight-bold">ETH Balance:</span> {props.balance}
        </div>
        <div className="d-flex flex-row">
          <span className="mt-2 mr-3">Do you want a Display Name?</span>
          <DMButton
            buttonStyle="btn-success px-3 mr-1"
            onPress={async (e) => {
              e.preventDefault();
              // alert('Adding Name');
              var ethUtil = require('ethereumjs-util');
              var sigUtil = require('eth-sig-util');
              var from = ethereum.selectedAddress;
              if (!from) return connect();
              let data;
              data = JSON.stringify({
                types: {
                  EIP712Domain: [
                    { name: 'name', type: 'string' },
                    { name: 'version', type: 'string' },
                    { name: 'chainId', type: 'uint256' },
                    {
                      name: 'verifyingContract',
                      type: 'address',
                    },
                  ],
                  // Person: [
                  //   { name: 'name', type: 'string' },
                  //   { name: 'wallet', type: 'address' },
                  // ],
                  Message: [{ name: 'text', type: 'string' }],
                },
                primaryType: 'Message',
                domain: {
                  name: 'DEVMOI',
                  version: '1',
                  chainId: ethereum.chainId,
                  verifyingContract:
                    '0xa8d145dd3003817da1dc83f838ee5088b65acf2e',
                },
                message: { text: 'You are Signing off Data' },
              });
              web3.eth.personal.sign(
                '\x19Ethereum Signed Message:\n' + data.length + data,
                from,
                '',
                function (err, result) {
                  if (err) return console.dir(err);
                  if (result.error) {
                    alert(result.error.message);
                  }
                  if (result.error) return console.error('ERROR', result);
                  console.log('TYPED SIGNED:' + JSON.stringify(result));
                  console.log(result);
                  const recovered = sigUtil.recoverTypedSignature({
                    data: JSON.parse(data),
                    sig: result,
                  });

                  if (
                    ethUtil.toChecksumAddress(recovered) ===
                    ethUtil.toChecksumAddress(from)
                  ) {
                    alert('Successfully ecRecovered signer as ' + from);
                  } else {
                    alert(
                      'Failed to verify signer when comparing ' +
                        result +
                        ' to ' +
                        from
                    );
                  }
                }
              );
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
        <span className="copy-text">{copy['copy']}</span>
      </div>

      {/* <MoiText
        value={text}
        maxLength={150}
        placeholder={'Hows the Code?'}
        containerStyle="border border-top-0 border-dark h-100"
        textAreaStyle="m-0"
        onChange={(e) => {
          setText(e.target.value);
        }}
        onKeyPress={handleKeyPress}
      /> */}
    </div>
  );
}
const mapStateToProps = (state) => ({
  address: state.session.address,
  balance: state.session.balance,
});

export default connect(mapStateToProps)(UserInfo);
