import "react-quill/dist/quill.snow.css";
import { useRef, useEffect } from "react";

import PropTypes from "prop-types";
import ReactQuill from "react-quill";

const QuillEditor = ({
  value = "",
  onChange,
  placeholder,
  theme = "snow",
  modules = {},
  readOnly = false,
  className,
  ...props
}) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      // Delay initialization slightly to prevent layout thrashing
      requestAnimationFrame(() => {
        editorRef.current.focus();
      });
    }
  }, []);

  const defaultModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const mergedModules = { ...defaultModules, ...modules };

  return (
    <div className="">
      <ReactQuill
        className={className}
        theme={theme}
        modules={mergedModules}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        {...props}
      />
    </div>
  );
};

QuillEditor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  theme: PropTypes.string,
  modules: PropTypes.object,
  formats: PropTypes.array,
  readOnly: PropTypes.bool,
  className: PropTypes.string,
};

export default QuillEditor;
