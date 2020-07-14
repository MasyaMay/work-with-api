import React, {Component} from 'react';
import Spinner from '../spinner';
import ErrorMessage from '../error';
import {ItemBlock} from '../itemBlock'
import './itemDetails.css';

export default class ItemDetails extends Component {

    state = {
        post: null,
        error: false
    }

    componentDidMount() {
        this.updateItem(this.props.idItem);
    }

    componentDidUpdate(prevProps) {
        if(this.props.idItem !== prevProps.idItem) {
            this.updateItem(this.props.idItem)
        }
    }

    updateItem = async idItem => {
        try {
            const post = await this.props.getData(idItem);
            this.setState({post})
        } catch {
            this.setState({error: true})
        }
    }

    render() {
        const {error, post} = this.state;
        if (!post && !error) {return <Spinner/>}
        if (error) {return <ErrorMessage/>}
        const {name} = post;

        return (
            <ItemBlock name = {name} post = {post} props = {this.props}/>
        );
    }
}