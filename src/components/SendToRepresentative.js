import React, { Component } from 'react'

export default class SendToRepresentative extends Component {
    render() {
        const { representativeEmail } = this.props;
        return (
            <form
                action="https://formspree.io/mwqnlrrm"
                method="POST"
            >
                <input type="hidden" name="_cc" value={representativeEmail} />
                <label>
                    Your email:
                    <input type="text" name="_replyto" />
                </label>
                <label>
                
                Your message:
                <textarea name="message"></textarea>
                </label>
                
                <button type="submit">Send</button>
            </form>
        );
    }
}