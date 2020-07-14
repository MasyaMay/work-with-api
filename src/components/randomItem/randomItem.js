import React, {Component} from 'react';
import Spinner from '../spinner';
import ErrorMessage from '../error';
import {ItemBlock} from '../itemBlock'

export default class RandomItem extends Component {

    state = {
        post: null,
        error: false
    }

    componentDidMount() {
        this.updateItem();
        this.timerId = setInterval(this.updateItem, 2000);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    updateItem = async () => {
        let id = this.props.books ? Math.random()*9 + 1 : Math.random()*125 + 25
        id = Math.floor(id) + '';
        try {
            const post = await this.props.getData(id);
            this.setState({post})
        } catch {
            this.setState({error: true});
            clearInterval(this.timerId);
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
