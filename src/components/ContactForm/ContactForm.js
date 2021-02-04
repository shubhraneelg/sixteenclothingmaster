import React, { Component } from 'react';

// const {REACT_APP_SPACE_ID} = process.env;
import config from '../../config'

class ContactForm extends Component {

    state={
        name:'',
        email:'',
        subject: '',
        message: '',
        nameError: '',
        emailError: '',
        subjectError:'',
        messageError:''
    }

    handleChange = (e) => {
        // this.setState({
        //     [e.target.id]: e.target.value.trim(),
        // });
        const isCheckbox = e.target.type === "checkbox";
        this.setState({
      [e.target.name]: isCheckbox
        ? e.target.checked
        : e.target.value
    });
    }
    validate = () => {
        let nameError = "";
        let emailError = "";
        let subjectError="";
        let messageError="";
        let isValid=true;
    
        if (this.state.name === "" || this.state.name.match("^[0-9]+$") ) {
         nameError = "Invalid Name, please enter correct name";
           
        }
        
    
        if (!this.state.email.includes("@")) {
          emailError = "Invalid Email, please include @";
        }
        if(!this.state.subject){
            subjectError = " Subject cannot be empty";
        }
        if(!this.state.message){
            messageError = "Message cannot be empty";
        }
    
        if (emailError || nameError || subjectError || messageError) {
          this.setState({ emailError, nameError });
          isValid = false;
        }
        return isValid;
      
      };
      blur = () => {
       this.state.nameError = "";
       this.state.emailError = "";
       this.state.messageError = "";
       this.state.subjectError ="";

      }
    refreshForm = () =>{
        document.getElementById("contact").reset();
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        const isValid = this.validate();
        // console.log("Valid---", isValid);
      if(isValid){
        this.blur();
        // console.log("Inside post");
        // console.log(this.state);
        window.fetch(
            `https://api.contentful.com/spaces/${config.REACT_APP_SPACE_ID}/entries`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/vnd.contentful.management.v1+json",
                    Authorization: `Bearer CFPAT-v6dbkisvhhmjlv9SriN3fWl3CWKOgw9cAPDigT8Vmck`,
                    "X-Contentful-Content-Type": "contactUsForm"
                },
                body: JSON.stringify({ fields: {
                    fullName: {
                      "en-US": this.state.name
                    },
                    emailAddress:{
                      "en-US": this.state.email
                    },
                    subject:{
                      "en-US": this.state.subject
                    },
                    message:{
                      "en-US": this.state.message
                    }
                  } }),
            }
        ).then(res => console.log(res))
            .catch(error=>  this.refreshForm() );
            this.refreshForm();

            alert('Thank You For Your Response');
         
    
      }
      else{
          alert("Error! Please fill correct details");
          this.refreshForm();
          }
      
      
      

    }

    render() {
        return (
            <div className="contact-form">
                <div className="contact-form">
                    <form id="contact" onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <fieldset>
                                    <input 
                                        name="name" 
                                        type="text" 
                                        className="form-control" 
                                        id="name" 
                                        placeholder="Full Name" 
                                        onChange={this.handleChange} onBlur ={this.blur}/>
                                        <div style={{ fontSize: 18, color: "red" }}>
                                        {this.state.nameError}
                                        </div>
                                </fieldset>
                            </div>

                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <fieldset>
                                    <input 
                                        name="email" 
                                        type="text" 
                                        className="form-control" 
                                        id="email" 
                                        placeholder="E-Mail Address" 
                                        required
                                        onChange={this.handleChange} onBlur={this.blur}
                                    />
                                    
                                </fieldset>
                            </div>
                                    <div style={{ fontSize: 18, color: "red" }}>
                                    {this.state.emailError}
                                    </div>

                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <fieldset>
                                    <input 
                                        name="subject" 
                                        type="text" 
                                        className="form-control" 
                                        id="subject" 
                                        placeholder="Subject" 
                                        required 
                                        onChange={this.handleChange} onBlur={this.blur}
                                    />
                                    <div style={{ fontSize: 18, color: "red" }}>
                                    {this.state.subjectError}
                                    </div>
                                </fieldset>
                            </div>

                            <div className="col-lg-12">
                                <fieldset>
                                    <textarea 
                                        name="message" 
                                        rows="6" 
                                        type="text" 
                                        className="form-control" 
                                        id="message" 
                                        required
                                        placeholder="Your Message"
                                        onChange={this.handleChange} onBlur={this.blur}
                                        >      
                                     </textarea>
                                     <div style={{ fontSize: 18, color: "red" }}>
                                    {this.state.messageError}
                                    </div>
                                </fieldset>
                            </div>

                            <div className="col-lg-12">
                                <fieldset>
                                    <button type="submit" id="form-submit" className="filled-button">Send Message</button>
                                </fieldset>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default ContactForm;