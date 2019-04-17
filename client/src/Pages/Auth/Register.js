import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import TextField, { Input } from "@material/react-text-field";
import Button from "@material/react-button";
import API from "../../utils/API";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            userName: "",
            email: "",
            password: "",
            password2: "",
            zipcode:"",
            city:"",
            errors: {}
        };
    }
    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/");
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    handleZipCode = (zipcode) => {
        if (zipcode.split("").length === 5 && /^[0-9]+$/.test(zipcode)) {
            API.getZipCode(zipcode)
                .then((res) => {
                    this.setState({
                        city: `${res.data.city}, ${res.data.state}`
                    })
             
                })
                .catch(err => console.log(err));
        };
      };
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        let city;
        e.preventDefault();
        if (this.state.zipcode.split("").length === 5 && /^[0-9]+$/.test(this.state.zipcode)) {
            API.getZipCode(this.state.zipcode)
                .then((res) => {
                    
                    city = `${res.data.city}, ${res.data.state}`
                    const newUser = {
                        name: this.state.name,
                        userName:this.state.userName,
                        email: this.state.email,
                        password: this.state.password,
                        password2: this.state.password2,
                        city: city
                        
                    };

                    console.log(newUser)
                    
                    this.props.registerUser(newUser, this.props.history);
                })
                .catch(err => console.log(err));
        };
       
        
    
        
        
    };
    render() {
        const { errors } = this.state;
        return (
            <div className="register-container">
                <div className="register-form">
                    <div className="header">
                        <h2>
          <img className="header" src="/whiteTextLogo.png" alt="The Minimalist" style={{width:"100%"}}></img>
                        </h2>
                    </div>
                    <form noValidate onSubmit={this.onSubmit}>
                        <div className="input-field">
                            <TextField
                                label='User Name'
                            >
                                <Input
                                    onChange={this.onChange}
                                    value={this.state.userName}
                                    error={errors.userName}
                                    id="userName"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.userName
                                    })}
                                />
                            </TextField>
                            <span className="red-text">{errors.userName}</span>
                        </div>
                        <div className="input-field">
                            <TextField
                                label='Name'
                            >

                                    <Input
                                        onChange={this.onChange}
                                        value={this.state.name}
                                        error={errors.name}
                                        id="name"
                                        type="text"
                                        className={classnames("", {
                                            invalid: errors.name
                                        })}
                                    />
                                </TextField>
                                <span className="red-text">{errors.name}</span>
                            </div>
                            <div className="input-field col s12">
                                <TextField label='Email'>
                                    <Input
                                        onChange={this.onChange}
                                        value={this.state.email}
                                        error={errors.email}
                                        id="email"
                                        type="email"
                                        className={classnames("", {
                                            invalid: errors.email
                                        })}
                                    />
                                </TextField>
                                <span className="red-text">{errors.email}</span>
                            </div>
                            <div className="input-field col s12">
                                <TextField label='Password'>
                                    <Input
                                        onChange={this.onChange}
                                        value={this.state.password}
                                        error={errors.password}
                                        id="password"
                                        type="password"
                                        className={classnames("", {
                                            invalid: errors.password
                                        })}
                                    />
                                </TextField>
                                <span className="red-text">{errors.password}</span>
                            </div>
                            <div className="input-field col s12">
                                <TextField label="Confirm">
                                    <Input
                                        onChange={this.onChange}
                                        value={this.state.password2}
                                        error={errors.password2}
                                        id="password2"
                                        type="password"
                                        className={classnames("", {
                                            invalid: errors.password2
                                        })}
                                    />
                                </TextField>
                                <span className="red-text">{errors.password2}</span>
                            </div>
                            <div className="input-field col s12">
                            <TextField label="Zip Code">
                                <Input
                                    onChange={this.onChange}
                                    value={this.state.zipcode}
                                    error={errors.zipcode}
                                    id="zipcode"
                                    type="zipcode"
                                    className={classnames("", {
                                        invalid: errors.zipcode
                                    })}
                                />
                            </TextField>
                            <span className="red-text">{errors.city}</span>
                        </div>
                        <div className="buttonContainer">
                            <Button
                                style={{
                                    width: "150px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem"
                                }}
                                type="submit"
                                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                            >
                                Sign up
                            </Button>
                            <Link to="/" className="btn-flat waves-effect">
                            <i className="material-icons left">keyboard_backspace</i> Back to
                            login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(Register));