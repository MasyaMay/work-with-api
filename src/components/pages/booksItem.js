import React, {Component} from 'react';
import ItemDetails from '../itemDetails';
import gotService from '../../services/gotService'
import {ItemField} from '../itemBlock';
import {Link} from 'react-router-dom';
import { Button } from 'reactstrap';

export default class BooksItem extends Component  {
    gotService = new gotService();

    render() {
        const {idBooks} = this.props;

        return (
            <>
                <ItemDetails idItem = {idBooks} getData = {this.gotService.getBook}>
                    <ItemField label = 'Authors' field = 'authors'/>
                    <ItemField label = 'Number of pages' field = 'numberOfPages'/>
                    <ItemField label = 'Publisher' field = 'publisher'/>
                </ItemDetails>
                <p className="lead">
                    <Button color="primary" size="lg"><Link to = '/books/'>Back to the books</Link></Button>
                </p>
            </>
        );
    }
}