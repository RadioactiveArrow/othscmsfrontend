import cookie from 'react-cookies';
import React, { useRef } from 'react';
import { themeData } from '../misc/config';
import Editor, { monaco } from '@monaco-editor/react';

monaco
  .init()
  .then(monaco => {
    monaco.editor.defineTheme('theme', themeData);
  })
  .catch(error =>
    console.error("An error occurred during initialization of Monaco: ", error)
  );


const CodeEditor = () => {
  const editorRef = useRef()

  const editorMountHandler = (_, editor) => {
    editorRef.current = editor
    var problemCookie = cookie.load('problem')
    if (problemCookie) {
      editor.setValue(atob(unescape(problemCookie)))
    }
    editorChangeListener()
  }

  const editorChangeListener = () => {
    editorRef.current.onDidChangeModelContent(e => {
      cookie.save('problem', btoa(escape(editorRef.current.getValue())), { 'path': '/' , 'maxAge': (10 * 365 * 24 * 60 * 60)})
    })
  }

  return (
    <>
      <Editor
        theme="theme"
        className="monaco-editor-component"
        language="java"
        height="100%"
        editorDidMount={editorMountHandler}
        options={{
          fontFamily: "Fira Code",
          fontSize: "17",
          automaticLayout: true
        }}
      />
    </>

  )
}

export default CodeEditor
