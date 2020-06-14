import React, { Component } from 'react';
import ReactModal from 'react-modal';

import BlogForm from "../blog/blog-form";

ReactModal.setAppElement(".app-wrapper");
 
export default class BlogModal extends Component {
    constructor(props) {
        super(props);

        this.customStyles = {
            content: {
                top: "50%",
                left: "50%",
                right: "auto",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
                width: "800px",
                height: "80%"
            },

            overlay: {
                backgroundColor: "rgba(1, 1, 1, 0.85)"
            }
        }

        this.handleSuccessfulFormSubmission = this.handleSuccessfulFormSubmission.bind(this);
    }

   

    handleSuccessfulFormSubmission(blogData) {
        this.props.updateBlogList(blogData);  
    }
        
    render() {
        return (
            <ReactModal 
                isOpen={this.props.isOpen} 
                onRequestClose={() => {
                    this.props.handleModalClose();
                }}
                style={this.customStyles}
            >
                <BlogForm handleSuccessfulFormSubmission={this.handleSuccessfulFormSubmission}/>
            </ReactModal>
        );
    }
}