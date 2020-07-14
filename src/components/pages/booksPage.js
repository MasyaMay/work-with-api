import React, {Component} from 'react';
import GroupList from '../groupList';
import ErrorMessage from '../error';
import gotService from '../../services/gotService'
import {withRouter} from 'react-router-dom';
import RandomItem from '../randomItem';
import {Button} from 'reactstrap';
import {ItemField} from '../itemBlock';
import RowBlock from '../rowBlock';

class BooksPage extends Component {

    state = {
        error: false
    }
    gotService = new gotService();

    componentDidCatch() {
        this.setState({error: true})
    }

    render() {
        const {error} = this.state;
        if (error) {return <ErrorMessage/>}

        const groupList = (
            <GroupList 
                setItemId = {(itemId) => {
                    this.props.history.push(itemId)
                }}
                getData = {this.gotService.getBooksAll}
                renderItem = {(item) => item.name}
            />
        )

        const randomItem = (
            <RandomItem getData = {this.gotService.getBook} books = 'books'>
                <ItemField label = 'Authors' field = 'authors'/>
                <ItemField label = 'Number of pages' field = 'numberOfPages'/>
                <ItemField label = 'Publisher' field = 'publisher'/>
            </RandomItem>
        )

        return (
            <RowBlock leftBlock = {groupList} rithtBlock = {randomItem}/>
        );
    }
}

export default withRouter(BooksPage);