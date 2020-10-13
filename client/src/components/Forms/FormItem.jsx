import React, { Component } from "react";
import LocationAutoComplete from "../LocationAutoComplete";
import "../../styles/form.css";
import { withUser } from "../Auth/withUser";

class ItemForm extends Component {
  state = {
    name: "",
    description: "",
    image: "",
    category: "",
    quantity: "",
    address: "",
    location: {
      type: "Point",
      coordinates: [0,0],
      formattedAddress: "",
    },
    id_user: this.props.authContext.user._id,
  };
  
  handleChange = event => {
    console.log("Wax On Wax Off");
    console.log(this.state.id_user);
    if(event.target.name === "location") {
      return 
    }
    const name = event.target.name;
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.type === "file"
        ? event.target.files[0]
        : event.target.value;

    this.setState({ [name]: value });
  }

  buildFormData = (formData, data, parentKey) => {
    if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
      Object.keys(data).forEach(key => {
        this.buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
      });
    } else {
      const value = data == null ? '' : data;
  
      formData.append(parentKey, value);
    }
  }
  
  jsonToFormData = (data) => {
    const formData = new FormData();
  
    this.buildFormData(formData, data);
  
    return formData;
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log("Wax On Wax Off");

    // In order to send back the data to the client, since there is an input type file you have to send the
    // data as formdata.
    // The object that you'll be sending will maybe be a nested object, in order to handle nested objects in our form data
    // Check out the stackoverflow solution below : )

    // Nested object into formData by user Vladimir "Vladi vlad" Novopashin @stackoverflow : ) => https://stackoverflow.com/a/42483509

    console.log(this.jsonToFormData(this.state))

  };

  handlePlace = place => {

    this.setState({
      address: place.place_name,
      location: {
        type: "Point",
        coordinates: place.center,
        formattedAddress: place.place_name,
      }
    })

  };

  render() {
    console.log(this.state.id_user)
    return (
      <div className="ItemForm-container">
        <form className="form" onChange={this.handleChange}>
          <h2 className="title">Add Item</h2>

          <div className="form-group">
            <label className="label" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              className="input"
              type="text"
              placeholder="What are you giving away ?"
              name="name"
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="category">
              Category
            </label>

            <select id="category" name ="category" defaultValue="-1">
              <option value="-1" disabled>
                Select a category
              </option>
              <option value="Plant">Plant</option>
              <option value="Kombucha">Kombucha</option>
              <option value="Vinegar">Vinegar</option>
              <option value="Kefir">Kefir</option>
            </select>
          </div>

          <div className="form-group">
            <label className="label" htmlFor="quantity">
              Quantity
            </label>
            <input 
              name="quantity"
              className="input" 
              id="quantity" 
              type="number" 
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="location">
              Address
            </label>
            <LocationAutoComplete onSelect={this.handlePlace} />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="description">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              className="text-area"
              placeholder="Tell us something about this item"
            ></textarea>
          </div>

          <div className="form-group">
            <label className="custom-upload label" htmlFor="image">
              Upload image
            </label>
            <input 
              name="image"
              className="input" 
              id="image" 
              type="file" 
            />
          </div>

          <h2>Contact information</h2>

          <div className="form-group">
            <label className="label" htmlFor="contact">
              How do you want to be reached?
            </label>
            <div>
              <input type="radio" />
              user email
            </div>
            <input type="radio" />
            contact phone number
          </div>

          <p className="message">
            <img src="/media/info.svg" alt="info" />
            Want to be contacted by phone? Add your phone number in your
            personal page.
          </p>

          <button className="btn-submit" onClick={this.handleSubmit}>Add Item</button>
        </form>
      </div>
    );
  }
}

export default withUser(ItemForm);
