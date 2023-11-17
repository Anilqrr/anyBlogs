import React from "react";
import { Link } from "react-router-dom";
// import U from '../uploads/'
export default function UseBlogs(props) {
  return (
    <div className="box">
      <div className="b-img">
        <img src={props.image} alt={props.image} />
      </div>
      <div className="b-title">
        <h3>{props.title}</h3>
      </div>
      <div className="b-desc">
        <p>
         {props.desc}<Link>Read More...</Link>
        </p>
      </div>
      <div className="b-auth">
        <img src={props.p_image} alt="auth" />
        <p>{props.user}</p>
        <h4>{props.time}</h4>
      </div>
      { props.success && <div className="action">
        <Link to="/updateblog">
          <button type="button" className="btn" id="btn-u">
            Update
          </button>
        </Link>
        <button type="button" className="btn" id="btn-d">
          Delete
        </button>
      </div>}
    </div>
  );
}
