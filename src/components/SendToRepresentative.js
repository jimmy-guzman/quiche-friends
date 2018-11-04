import React, { Component } from 'react';
import _isArray from 'lodash/isArray';

export default class SendToRepresentative extends Component {
    // constructor(props){
    //     super(props)

        // this._replyto = React.createRef()
        // this._cc = React.createRef()
        // this._subject = React.createRef()
        // this.message = React.createRef()
    // }

    // handleSubmit = (e) => {
    //     e.preventDefault()
    //     console.dir(this._replyto.current.value)
    //     // fetch("https://formspree.io/mwqnlrrm", {
    //     //     method: "POST", body: JSON.stringify({
    //     //         _replyto: this._replyto.current.value,
    //     //         _cc: this._cc.current.value,
    //     //         _subject: this._subject.current.value,
    //     //         message: this.message.current.value      
    //     //     })
    //     // })  
    //     fetch("https://formspree.io/mwqnlrrm", {
    //         method: "POST", body: JSON.stringify({
    //             headers: {"Content-Type": "application/json ; charset=utf-8"},
    //             message: "hello"      
    //         })
    //     })  
    //  }


    render() {
        const { representativeEmail } = this.props;
        const ccEmails = _isArray(representativeEmail) ? representativeEmail.join(',') : representativeEmail;
        const currentLocation = window.location.href;

        return (
            <form
                action="https://formspree.io/mwqnlrrm"
                method="POST"
                // ref={this.form}
                // onSubmit={(e)=>this.handleSubmit(e)}
            >

            {/* this should be able to take an array of email addresses and return it as a string separated by commas  */}
                <input type="hidden" name="_cc" value={ccEmails} ref={this._cc}/>

                {/* URL should load dynamic URL of page user is on */}
                <input type="hidden" name="_next" value={currentLocation} />
                
                <label>
                    Your email:
                    {/* this should be autofilled with a verified user's email address */}
                    <input type="text" name="_replyto" ref={this._replyto}/>
                </label>

                {/* should autofill with the issue you are e-mailing about */}
                <label>
                    Subject:
                    <input type="text" name="_subject" value="A note from your constituent" ref={this._subject} />
                </label>

                {/* should autofill with the issue you are e-mailing about */}
                <label>
                Your message:
                <textarea name="message" ref={this.message}></textarea>
                </label>
                
                <button type="submit">Send</button>
            </form>
        );
    
    }
}