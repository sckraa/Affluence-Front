import React, { Fragment } from 'react';
import '../assets/style/SignUp.css';
import Backgound from '../images/login_background.jpg';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            pseudo: "",
            password: "",
            response: {
                status: 0,
                message: ""
            },
        }

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePseudo = this.onChangePseudo.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.signUpUser = this.signUpUser.bind(this);
    }

    // ASYNC FUNCTION THAT SENDS USER DATA TO THE API
    async signUpUser() {
        let currentComponent = this;

        // SIMPLE POST REQUEST WITH A JSON BODY USING FETCH
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(this.state)
        };
        fetch('https://www.projet-web-training.ovh/affluence/Affluence/public/user/register', requestOptions)
            .then(function(response) {                
                if(currentComponent.state.email === "") {
                    currentComponent.setState({response: {status: 1}});
                } else if(currentComponent.state.pseudo === "") {
                    currentComponent.setState({response: {status: 2}})
                } else if(currentComponent.state.password === "") {
                    currentComponent.setState({response: {status: 3}})
                } else if(response.status === 409) {
                    currentComponent.setState({response: {status: response.status, message: "L'email ou le pseudo est déjà utilisé."}});
                } else if(response.status === 415) {
                    currentComponent.setState({response: {status: response.status, message: "Le mot de passe doit contenir au moins une minuscule, une majuscule, un caractère spécial [$ @ % * + - _ !] et 6 caractères. "}});
                } else if( response.status === 201) {
                    currentComponent.setState({response: {status: 201}});
                }
            })
            .catch(err => { console.log(err) });
    }

    // CHANGE THE EMAIL IN THE STATE 
    onChangeEmail(event) {
        this.setState({
            email: event.target.value,
        });
    }

    // CHANGE THE USERNAME IN THE STATE 
    onChangePseudo(event) {
        this.setState({
            pseudo: event.target.value,
        });
    }

    // CHANGE THE PASSWORD IN THE STATE
    onChangePassword(event) {
        this.setState({
            password: event.target.value,
        });
    }

    // DISPLAY ERRORS BY RESPONSE
    responseRequest() {
        switch(this.state.response.status) {
            case 1 :
                return(
                    <div className="form-error error-message">
                        <h4>L'email n'est pas renseigné.</h4>
                    </div>
                );
            case 2 :
                return(
                    <div className="form-error error-message">
                        <h4>Le pseudo n'est pas renseigné.</h4>
                    </div>
                );
            case 3 :
                return(
                    <div className="form-error error-message">
                        <h4>Le mot de passe n'est pas renseigné.</h4>
                    </div>
                );
            case 4 :
                return(
                    <div className="form-error error-message">
                        <h4>Le mot de passe n'est pas correctement reseigné.</h4>
                    </div>
                );
            case 409 :
                return(
                    <div className="form-error error-message">
                        <h4>{this.state.response.message}</h4>
                    </div>
                );
            case 415 :
                return(
                    <div className="form-error error-message">
                        <h4>{this.state.response.message}</h4>
                    </div>
                );
            case 201 :
                return(
                    <div className="form-error error-message">
                        <h4>Vous êtes bien enregisté sur le site.</h4>
                    </div>
                );
            default :
                return "";
        }
    }

    render() {
        return(
            <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: 0 }} 
                exit={{ x: "-100%" }} 
                transition={{ duration: 1 }}
            >
                <Fragment>
                    <div className="signup-content" style={{background: `url(${Backgound}) center center / cover no-repeat`}}>
                        <form className="signup-form">
                            <h1 className="title">Affluence</h1>
                            <div className="inputs">
                                <div className="mail-section input-section">
                                    <input type="email" name="mail" className="input input-email" autoComplete="off" required onChange={this.onChangeEmail} />
                                    <label htmlFor="mail" className="label-name">
                                        <span className="content-name">Email</span>
                                    </label>
                                </div>
                                <div className="username-section input-section">
                                    <input type="text" name="username" className="input" autoComplete="off" required onChange={this.onChangePseudo} />
                                    <label htmlFor="username" className="label-name">
                                        <span className="content-name">Utilisateur</span>
                                    </label>
                                </div>
                                <div className="password-section input-section">
                                    <input type="password" name="password" className="input" required onChange={this.onChangePassword} />
                                    <label htmlFor="password" className="label-name">
                                        <span className="content-name">Mot de passe</span>
                                    </label>
                                </div>
                            </div>
                            <div className="signup-form__submit-wrapper">
                                <Link to="/affluence/login"><div className="signup-form__button cta">Se logger</div></Link>
                                <div className="signup-form__button cta" onClick={this.signUpUser}>S'inscrire</div>
                            </div>
                            <div className="signup-form__home">
                                <Link to="/affluence/">
                                    <div className="login-form__button cta">Accueil</div>
                                </Link>
                            </div>
                            {this.responseRequest()}
                        </form>
                    </div>
                </Fragment>
            </motion.div>
        );
    }
}

export default SignUp;
