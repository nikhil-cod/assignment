import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../Redux/action";
import { useNavigate } from "react-router-dom";

const Template = () => {
  const navigate = useNavigate();
  const templateList = useSelector((state) => state.appReducer.template_list);

  useEffect(()=>{
    localStorage.setItem("template-list",templateList)
  },[])
  return (
    <React.Fragment>
      <div className="border border-secondary">
        <button
          className="float-end p-1 mx-5 my-2"
          onClick={() => navigate("/create")}
        >
          Create
        </button>

        <h1>Template List</h1>
      </div>
      <h5 className="my-4">Template Name</h5>

      <div>
        {templateList.map((item) => {
          return <h4 className="m-1 p-1 border border-secondary">{item}</h4>;
        })}
      </div>
    </React.Fragment>
  );
};

export default Template;
