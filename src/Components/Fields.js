import React, { useState } from "react";
import { actions } from "../Redux/action";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Preview from "./Preview";
const Fields = () => {
  const navigate = useNavigate();
  const previewData = useSelector((state) => state.appReducer.preview_data);
  const show_modal = useSelector((state) => state.appReducer.show_modal);
  const templateList = useSelector((state) => state.appReducer.template_list);

  const dispatch = useDispatch();
  const [displayElement, setDisplayElement] = useState("text_filed");
  const [templatename, setTemplateName] = useState("");
  const [fieldLableTextfield, setFieldLabelTextField] = useState({
    value: "",
    required: false,
  });
  const [placeholder, setPlaceholder] = useState("");
  const [fieldLableDropdown, setFieldLabelDropdown] = useState({
    value: "",
    required: false,
  });
  const [dropdownArray, setDropdownArray] = useState([
    {
      value: "",
    },
  ]);

  const dropdownInputHandle = (e, index) => {
    let inputvalue = e.target.value;
    let tempArray = [...dropdownArray];
    tempArray[index] = { ...tempArray[index], value: inputvalue };
    setDropdownArray(tempArray);
  };

  const deleteItem = (e, index) => {
    if (index != 0) {
      let tempArray = [...dropdownArray];
      tempArray.splice(index, 1);
      setDropdownArray(tempArray);
    }
  };

  const addDropdownItems = () => {
    let tempArray = [...dropdownArray];
    tempArray.push({
      value: "",
    });
    setDropdownArray(tempArray);
  };

  const showPreview = () => {
    getData();
    dispatch({
      type: actions.SHOW_MODAL,
      data: true,
    });
  };

  const submitHandler = () => {
    dispatch({
      type: actions.TEMPLATE_LIST,
      data: [...templateList, templatename],
    });
    navigate("/");
  };

  const getData = () => {
    let obj = {};
    obj.displayElement = displayElement;
    obj.templatename = templatename;
    if (displayElement == "text_filed") {
      obj.fieldLabel = fieldLableTextfield;
      obj.fieldData = [placeholder];
    } else {
      obj.fieldLabel = fieldLableDropdown;
      obj.fieldData = [...dropdownArray];
    }
    dispatch({
      type: actions.PREVIEW_DATA,
      data: obj,
    });
    console.log("Object", obj);
  };
  return (
    <React.Fragment>
      <div className="border border-secondary">
        <h1 className="text-primary">Tool Box</h1>
        <h3
          className="text-danger"
          onClick={() => setDisplayElement("text_filed")}
        >
          Text Field
        </h3>
        <h3
          className="text-primary"
          onClick={() => setDisplayElement("dropdown_field")}
        >
          Drop Down
        </h3>
      </div>

      <h1 className="m-2 p-2">Create Template</h1>
      <div className="m-2 p-2">
        {/* //Template Name */}
        <label>Template Name</label>
        <br />
        <input
          value={templatename}
          onChange={(e) => setTemplateName(e.target.value)}
        ></input>
      </div>
      <br />
      <br />

      {/* Text Filed Box */}
      <div
        className={
          displayElement == "text_filed"
            ? "border border-success border-3 p-4 m-3 "
            : "border border-secondary p-4 m-3"
        }
      >
        <input
          class="form-check-input float-end"
          type="radio"
          value="text_filed"
          checked={displayElement == "text_filed"}
          onChange={() => setDisplayElement("text_filed")}
        />{" "}
        <label>Field Label</label>
        <br />
        <input
          value={fieldLableTextfield.value}
          onChange={(e) =>
            setFieldLabelTextField({
              ...fieldLableTextfield,
              value: e.target.value,
            })
          }
        ></input>{" "}
        <label class="form-check-label m-1">Required</label>
        <input
          class="form-check-input m-1"
          type="checkbox"
          checked={fieldLableTextfield.required}
          onChange={() =>
            setFieldLabelTextField({
              ...fieldLableTextfield,
              required: !fieldLableTextfield.required,
            })
          }
        />{" "}
        <br />
        <br />
        <label>Placeholder</label>
        <br />
        <input
          value={placeholder}
          onChange={(e) => setPlaceholder(e.target.value)}
        ></input>
      </div>

      {/* Dropdown Filed Box */}
      <div
        className={
          displayElement == "dropdown_field"
            ? "border border-success border-3 p-4 m-3 "
            : "border border-secondary p-4 m-3"
        }
      >
        <input
          class="form-check-input float-end"
          type="radio"
          value="dropdown_field"
          checked={displayElement == "dropdown_field"}
          onChange={() => setDisplayElement("dropdown_field")}
        />
        <label>Field Label</label>
        <br />
        <input
          value={fieldLableDropdown.value}
          onChange={(e) =>
            setFieldLabelDropdown({
              ...fieldLableDropdown,
              value: e.target.value,
            })
          }
        ></input>
        <label class="form-check-label m-1">Required</label>
        <input
          class="form-check-input m-1"
          type="checkbox"
          checked={fieldLableDropdown.required}
          onChange={() =>
            setFieldLabelDropdown({
              ...fieldLableDropdown,
              required: !fieldLableDropdown.required,
            })
          }
        />{" "}
        <br />
        <br />
        <label>
          Dropdown Options{" "}
          <span className="fw-bold" onClick={() => addDropdownItems()}>
            +
          </span>
        </label>
        <br />
        {dropdownArray.map((item, index) => {
          return (
            <div>
              {" "}
              <input
                className="m-2"
                value={item.value}
                onChange={(e) => dropdownInputHandle(e, index)}
              ></input>{" "}
              <span className="fw-bold" onClick={(e) => deleteItem(e, index)}>
                X
              </span>
            </div>
          );
        })}
      </div>

      <div className="float-end">
        <button className="m-1" onClick={() => submitHandler()}>
          Submit
        </button>
        <button className="m-1" onClick={() => showPreview()}>
          Preview
        </button>
      </div>
      {show_modal && <Preview />}
    </React.Fragment>
  );
};

export default Fields;
