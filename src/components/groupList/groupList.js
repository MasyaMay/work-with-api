import React, {Component} from 'react';
import Spinner from '../spinner';
import ErrorMessage from '../error';
import './groupList.css';

export default class GroupList extends Component {

    state = {
        posts: null,
        error: false
    }
    
    async componentDidMount() {
        try {
            const posts = await this.props.getData();
            this.setState({posts})
        } catch {
            this.setState({error: true})
        }
    }

    createItems = posts => {
        return posts.map(item => {
            return (
                <li 
                    key = {item.id}
                    className="list-group-item"
                    onClick = {() => this.props.setItemId(item.id)}
                >
                        {this.props.renderItem(item)}
                </li>
            )
        })
    }

    render() {
        const {posts, error} = this.state;
        if (!posts && !error) {return <Spinner/>}
        if (error) {return <ErrorMessage/>}
        const items = this.createItems(posts);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}