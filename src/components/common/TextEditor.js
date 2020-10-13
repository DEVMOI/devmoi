import React, { useEffect, useRef, useState } from 'react';
import EditorJs from 'react-editor-js';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';
const EDITOR_JS_TOOLS = {
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },
  list: {
    class: List,
    inlineToolbar: true,
  },
};
const TextEditor = ({
  id,
  label,
  labelStyle,
  editorContainerStyle,
  getValue,
  Data,
}) => {
  const instanceRef = useRef(null);
  async function handleSave() {
    // const savedData = await
    instanceRef.current
      .save()
      .then((outputData) => {
        function replaceAll(str, find, replace) {
          function escapeRegExp(string) {
            return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
          }
          return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
        }
        let stringData = JSON.stringify(outputData);
        let formattedData = replaceAll(stringData, '<b>', '<strong>');
        formattedData = replaceAll(stringData, '<b/>', '<strong/>');
        getValue(formattedData);
      })
      .catch((error) => {
        console.log('Saving failed: ', error);
      });
  }
  return (
    <div>
      <style global jsx>
        {`
          .ce-block__content {
            max-width: 100%;
            margin: 0 1rem;
          }
          .ce-toolbar__content {
            max-width: 100%;
            margin: 0 3.5rem;
            position: relative;
          }
          .editor-style {
            border-radius: 0.25rem;
            border-color: #ced4da;
          }
        `}
      </style>
      <label
        htmlFor={id}
        className={
          typeof labelStyle === 'undefined' || labelStyle === null
            ? `css-idd-label-style fnt-goth-book`
            : `css-idd-label-style fnt-goth-book ${labelStyle}`
        }>
        {label}
      </label>
      <div
        className={`border rounded ${
          typeof editorContainerStyle !== undefined
            ? editorContainerStyle
            : null
        }`}>
        {window !== undefined ? (
          <EditorJs
            holder={id}
            instanceRef={(instance) => (instanceRef.current = instance)}
            data={
              typeof Data === 'string' && Data.length !== 0
                ? JSON.parse(Data)
                : Data
            }
            onChange={(e) => handleSave(e)}
            tools={EDITOR_JS_TOOLS}>
            <div id={id} />
          </EditorJs>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};
export default TextEditor;
