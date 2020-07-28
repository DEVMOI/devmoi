import axios from 'axios';
import types from './types';
const { GET_PAGE_DATA } = types;
// Gets Data From DB and Sets it to Reducer
export const getPageData = (currentPage) => async (dispatch, getState) => {
  const page = currentPage.page,
    config = {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
    bodyData = new FormData();
  bodyData.append('page', page);
  console.log('pages;', page);
  try {
    await axios
      .get(`/api/pages/getPage/${page}`)
      .then((res) => {
        if (res.data !== undefined) {
          let payload = res.data;
          console.log('Updated PAges');
          dispatch({
            type: GET_PAGE_DATA,
            payload,
          });
        }
      })
      .catch((err) => {
        console.log('pageActions -> updatePage:', err);
      });
  } catch (error) {
    console.log('pageActions -> updatePage:', error);
  }
};

export const setVisibility = (payload) => (dispatch) => {
  dispatch({
    type: 'SET_PAGE_VISIBILITY',
    payload,
  });
};
export const setPageData = (payload) => (dispatch) => {
  dispatch({
    type: 'SET_PAGE_DATA',
    payload,
  });
};

export const updatePage = () => async (dispatch, getState) => {
  try {
    const { pageReducer } = getState(),
      config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
      bodyData = new FormData();
    console.log(pageReducer.pageData.sections);
    // pageReducer.pageData.sections.map((section) => {
    //   console.log(section.thumbnail);
    //   section.thumbnail !== null
    //     ? bodyData.append(
    //         'pagethumbnail',
    //         section.thumbnail
    //         // section.thumbnail.name
    //       )
    //     : '';

    //   bodyData.append('fileId', pageReducer.pageData.sections.thumbnail);
    // });
    bodyData.append('visibility', pageReducer.visibility);
    bodyData.append('page', pageReducer.pageData.page);
    bodyData.append('sections', JSON.stringify(pageReducer.pageData.sections));
    await axios
      .post('/api/pages/updatePage', bodyData, config)
      .then((res) => {
        if (res.data !== undefined) {
          console.log('Updated PAges');
        }
      })
      .catch((err) => {
        console.log('pageActions -> updatePage:', err);
      });
  } catch (err) {
    console.log('pageActions -> updatePage: ', err);
  }
};

export const setPageThumbnail = (file) => (dispatch) => {
  let fileProps = file[0],
    thumbnailProps = {};
  for (const property in fileProps) {
    thumbnailProps[property] = fileProps[property];
  }
  //thumbnailProps.size should be replaced by a set size limit
  if (thumbnailProps.size !== undefined && thumbnailProps.size) {
    dispatch({ type: 'SET_PAGE_THUMBNAIL', payload: fileProps });
  } else {
    console.log('file size is too large or exceeds limit acceptable limit');
  }
};
