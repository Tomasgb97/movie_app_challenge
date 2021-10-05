import React, { Component } from "react";
import { Link } from "react-router-dom";

export class CastComponent extends Component {
  constructor(props) {
    super(props);

    this.addDefaultSrc = this.addDefaultSrc.bind(this);
  }

  addDefaultSrc(ev) {
    //sets a default image in case the src link provided by the api dosen't return any.
    ev.target.src = "../noimage.png";
  }

  render() {
    const { img, actorname, id } = this.props;
    return (
      <Link
        data-aos="fade-left"
        data-aos-duration="500"
        data-aos-delay="100"
        to={`/actors/${id}`}
        className="actorCard"
      >
        <div className='actorCard__imgcont'>
          <img
            onError={this.addDefaultSrc}
            className="actorCard__imgcont__img"
            alt={actorname}
            src={img}
          ></img>
        </div>
        <h4 className="actorCard__name">{actorname}</h4>
      </Link>
    );
  }
}

export default CastComponent;