import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import "../styles/Profile.css";
import "../styles/CardItem.css";
import apiHandler from "../api/apiHandler";


class Profile extends Component {

  state = {
    phoneNumber: this.props.authContext.user.phoneNumber,
    userItems: null,
  }

  handleSubmit = (event) => {
    event.preventDefault();
    apiHandler
      .updateProfile({ phoneNumber: this.state.phoneNumber })
      .then((res)=> this.props.authContext.changePhoneNumber(res.phoneNumber))
      .catch(error => console.log(error))
  }

  handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    this.setState({ [key] : value }, () => console.log(this.state.phoneNumber, "yo"))
  }

  componentDidMount(){

    apiHandler
      .getItems()
      .then((apiRes) => {
        const userItems = apiRes.filter(item => item.id_user === this.props.authContext.user._id);
        this.setState({ userItems : userItems })
        console.log(this.state)
      })
      .catch()


  }


  render() {
    const { authContext } = this.props;
    const { user } = authContext;
    return (
      <div style={{ padding: "100px", fontSize: "1.25rem" }}>
        <section className="Profile">
          <div className="user-image round-image">
            <img src={user.profileImg} alt={user.firstName} />
          </div>
          <div className="user-presentation">
            <h2>
              {user.firstName} {user.lastName}
            </h2>
            <Link className="link" to="/profile/settings">
              Edit profile
            </Link>
          </div>


          <div className="user-contact">
            {
              !this.props.authContext.user.phoneNumber 
              ? (
            <>
            <h4>Add a phone number</h4>

            <form className="form" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label className="label" htmlFor="phoneNumber">
                  Phone number
                </label>
                <input
                  className="input"
                  id="phoneNumber"
                  type="text"
                  name="phoneNumber"
                  placeholder="Add phone number"
                  value={this.state.phoneNumber}
                  onChange={this.handleChange}
                />
              </div>
              <button className="form__button">Add phone number</button>
            </form>
            </>)
            : <>
              <h1>telephone number :</h1>
              <p>{this.state.phoneNumber}</p>
              </>

            }
          </div>

          {/* Break whatever is bello  */}
          <div className="CardItem">
            { !this.state.userItems 
              ?(
                <div className="item-empty">
                  <div className="round-image">
                    <img src="/media/personal-page-empty-state.svg" alt="" />
                  </div>
                  <p>You don't have any items :</p>
                </div>
              )
              : (
                <div>
                  <h3>Your items</h3>
                  {
                    this.state.userItems.map(item => {
                      return(
                        <div className="CardItem">
                        <div key={item._id} className="item">
                          <div className="round-image">
                            <img
                              src={item.image}
                              alt="item"
                            />
                          </div>
                          <div className="description">
                            <h2>{item.name}</h2>
                            <h4>Quantity: {item.quantity} </h4>
                            <p>{item.description}</p>
                            <div className="buttons">
                              <span>
                                <button className="btn-secondary">Delete</button>
                              </span>
                              <span>
                                <button className="btn-primary">Edit</button>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      )
                    })
                  
                  }
                </div>
              )}
          </div>    
        
       </section>
      </div>
    );
  }
}

export default withUser(Profile);
