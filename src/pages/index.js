import { truncateAddress } from 'lib';
import { connect } from 'react-redux';
import { useState } from 'react';
import { Button, Textarea } from 'rimble-ui';
import bcrypt from 'bcryptjs';
import { hash, getUID } from 'moihelp';
import { toggleShowAnnoucement } from '@/actions';

async function getNonce(data) {
  try {
    let nonce,
      num = data.length > 0 ? data.length - 1 : 0;

    if (data.length > 0) {
      let arr = last(data);
      console.log(arr);
      if (arr !== undefined && arr.nonce !== undefined) {
        nonce = arr.nonce + 1;
      } else {
        nonce = 0;
      }
      return nonce;
    } else {
      nonce = 0;
      return nonce;
    }
  } catch (error) {
    console.log('getNonce()', error);
  }
}
async function last(array) {
  return await array[array.length - 1];
}

function AnnoucementLetter(props) {
  const { address, onClose, show } = props;

  return show ? (
    <div
      className={`community-letter mx-auto my-5 p-5 border border-dark position-relative ${props.AnnoucementLetterStyle}`}>
      <style jsx>
        {`
          .community-letter {
            max-width: 650px;
          }
          .address {
            width: 100px;
          }
        `}
      </style>
      <button onClick={onClose} className={`btn position-absolute top-0 end-0`}>
        X
      </button>
      <p className={`h3 text-capitalize`}>
        Welcome{' '}
        <span title={`${address}`} className={`address text-truncate`}>
          {address !== null &&
          address !== undefined &&
          address.length !== 0 &&
          address[0] !== undefined ? (
            <strong>
              <u>
                {truncateAddress(Array.isArray(address) ? address[0] : address)}
              </u>
            </strong>
          ) : (
            'To Devmoi'
          )}
        </span>
        ,
      </p>
      <p className={`text-capitalize fnt-size-16`}>
        This is a Portal into the world of Web3.
      </p>
      <p className={`text-capitalize fnt-size-16`}>
        This is an Experimental website utilizing various api to bring what web3
        has to offer you, so please use with caution.
      </p>
      {!(
        address !== null &&
        address !== undefined &&
        address.length !== 0 &&
        address[0] !== undefined
      ) ? (
        <div className="w-100 h-100">
          <p className={`text-capitalize fnt-size-16`}>
            To have a full experience,{' '}
            <strong>
              <u>Please connect your Ethereum wallet</u>
            </strong>{' '}
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              className="bi bi-arrow-up-right-circle-fill"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.879 10.828a.5.5 0 1 1-.707-.707l4.096-4.096H6.5a.5.5 0 0 1 0-1h3.975a.5.5 0 0 1 .5.5V9.5a.5.5 0 0 1-1 0V6.732l-4.096 4.096z"
              />
            </svg>
          </p>
          <p className={`text-capitalize fnt-size-16`}>
            <i>
              or follow the on-boarding process using the instructions above.
            </i>
          </p>
          <p className={`text-capitalize fnt-size-16`}></p>
        </div>
      ) : (
        <div />
      )}
    </div>
  ) : (
    <div
      className={`community-letter-collapse mx-auto mb-5 border border-dark position-relative ${props.AnnoucementLetterStyle}`}>
      <style jsx>
        {`
          .community-letter-collapse {
            max-width: 650px;
            padding: 1.35rem;
          }
          .address {
            width: 100px;
          }
        `}
      </style>
      <button onClick={onClose} className={`btn position-absolute top-0 end-0`}>
        V
      </button>
    </div>
  );
}
function FeedTextArea(props) {
  return (
    <div className={`text-area ${props.textAreaStyle}`}>
      <textarea
        className={`text-area w-100 p-3 `}
        placeholder={`What's The Move?`}
        rows={4}
        onChange={(e) => {
          props.onChange(e.target.value);
        }}
        value={props.value}
      />
      {props.children}
    </div>
  );
}
function FeedButton(props) {
  const { feedButtonContainerStyle } = props;
  return (
    <span
      className={`feed-button border border-left-0 border-dark ${
        feedButtonContainerStyle !== undefined ? feedButtonContainerStyle : ''
      }`}>
      <Button.Base
        height={'100%'}
        color={'black'}
        onClick={() => props.onPress()}>
        Submit
      </Button.Base>
    </span>
  );
}
function FeedInput(props) {
  const { feedInputStyle, address } = props;
  return (
    <div
      className={`feed-input d-flex flex-column m-0 p-3 border border-dark position-relative ${feedInputStyle}`}>
      <p>
        <strong>
          <u>
            {truncateAddress(Array.isArray(address) ? address[0] : address)}
          </u>
        </strong>
      </p>
      <FeedTextArea
        textAreaStyle={`position-relative`}
        value={props.value}
        onChange={(e) => props.onChange(e)}>
        <span
          className={`feed-text-length px-3 position-absolute bottom-0 end-0`}>
          {props.value.length}/280
        </span>
      </FeedTextArea>
      <FeedButton
        feedButtonContainerStyle={`mt-3 ms-auto`}
        onPress={() => props.onPress()}
      />
    </div>
  );
}

function FeedItem(props) {
  const { address, date, content } = props;
  return (
    <div
      className={`feed-item rounded mx-auto d-flex flex-column border border-dark p-3 my-3`}>
      <style jsx>
        {`
          .feed-item {
            max-width: 650px;
          }
        `}
      </style>
      <div className={`d-flex flex-column`}>
        <p>{truncateAddress(address)}</p>
        <p>Date: {date}</p>
      </div>
      <div>{content}</div>
      <hr />
      <div className={`d-flex flex-row`}>
        <button
          onClick={() => {
            console.log(`Liked Post`);
          }}
          className={`mr-4`}>
          {' '}
          Like
        </button>{' '}
        {` `}
        <button
          onClick={() => {
            console.log(`Disliked Post`);
          }}
          className={`mr-4`}>
          Dislike
        </button>
      </div>
    </div>
  );
}

function Feed(props) {
  return (
    <div className={`feed `}>
      <hr />
      {Array.isArray(props.data) && props.data.length >= 1 ? (
        <div className={`h-100 feed-items`}>
          {props.data
            .sort((a, b) => b.nonce - a.nonce)
            .map(({ address, date, text }, i) => {
              return (
                <FeedItem
                  key={i}
                  address={address}
                  date={date}
                  content={text}
                />
              );
            })}
        </div>
      ) : (
        <div />
      )}
      <hr />
    </div>
  );
}

const Home = (props) => {
  const { address, showAnnoucement, toggleShowAnnoucement } = props;
  const [textState, setTextState] = useState('');
  const [feedState, setFeedState] = useState([]);
  const [isShown, setIsShown] = useState(true);

  async function submitPost() {
    let data = {};
    // data.id =
    //   Math.sign(
    //     await hash(
    //       (await address.substring(address.indexOf(0, 32))) +
    //         Date.now() +
    //         textState
    //     )
    //   ) === -1 ||
    //   Math.sign(
    //     await hash(
    //       (await address.substring(address.indexOf(0, 32))) +
    //         Date.now() +
    //         textState
    //     )
    //   ) === -0
    //     ? (await hash(
    //         (await address.substring(address.indexOf(0, 32))) +
    //           Date.now() +
    //           textState
    //       )) * -1
    //     : await hash(
    //         (await address.substring(address.indexOf(0, 32))) +
    //           Date.now() +
    //           textState
    //       );

    data.date = Date.now();
    data.address = address;
    data.text = textState;

    await console.log(`Creating Post:`, feedState, data);
    await setFeedState([...feedState, data]);
    await setTextState('');
  }

  return (
    <div className="home container h-100 pt-5">
      <style global jsx>
        {`
          .home {
            overflow-y: scroll;
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
          }
          .home::-webkit-scrollbar {
            display: none;
          }
          .feed-input {
            max-width: 650px;
          }
          .feed-button {
            height: 50px;
            width: 116px;
          }
          .text-area {
            max-width: 650px;
            width: 100%;
            height: 115px;
            resize: none;
          }
        `}
      </style>
      <AnnoucementLetter
        show={showAnnoucement}
        address={address}
        onClose={() => toggleShowAnnoucement(!showAnnoucement)}
      />
      <FeedInput
        address={address}
        feedInputStyle={'mx-auto'}
        value={textState}
        onChange={(e) => {
          if (e.length <= 280) setTextState(e);
        }}
        onPress={async () => {
          if (textState.length > 0) {
            await submitPost();
          }
        }}
      />
      <Feed data={feedState} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  address: state.session.address,
  showAnnoucement: state.session.showAnnoucement,
});

export default connect(mapStateToProps, { toggleShowAnnoucement })(Home);
