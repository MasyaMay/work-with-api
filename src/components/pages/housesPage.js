import React, {Component} from 'react';
import RowBlock from '../rowBlock';
import GroupList from '../groupList';
import ItemDetails from '../itemDetails';
import ErrorMessage from '../error';
import Spinner from '../spinner';
import gotService from '../../services/gotService'
import RandomItem from '../randomItem';
import {Button} from 'reactstrap';
import {ItemField} from '../itemBlock';

export default class BooksPage extends Component {

    state = {
        idItem: null,
        error: false,
        click: false
    }
    gotService = new gotService();

    async componentDidMount() {
        try {
            const idItem = await this.gotService.getFirstHouse();
            this.setState({idItem})
        } catch {
            this.setState({error: true})
        }
    }

    componentDidCatch() {
        this.setState({error: true})
    }

    setItemId = id => {
        this.setState({
            idItem: id
        })
    }

    onToggleBtn = () => {
        this.setState(({click}) => {
            return {click: !click}
        })
    }

    render() {
        const {idItem,  error, click} = this.state;
        if (!idItem) {return <Spinner/>}
        if (error) {return <ErrorMessage/>}
        
        const groupList = (
            <GroupList 
                setItemId = {this.setItemId}
                getData = {this.gotService.getHousesAll}
                renderItem = {(item) => item.name}
            />
        )

        const itemDetails = (
            <ItemDetails idItem = {idItem} getData = {this.gotService.getHouse}>
                <ItemField label = 'Region' field = 'region'/>
                <ItemField label = 'Words' field = 'words'/>
                <ItemField label = 'Titles' field = 'titles'/>
                <ItemField label = 'Overlord' field = 'overlord'/>
                <ItemField label = 'Ancestral Weapons' field = 'ancestralWeapons'/>
            </ItemDetails>
        )

        const randomItem = (
            <RandomItem getData = {this.gotService.getHouse}>
                <ItemField label = 'Region' field = 'region'/>
                <ItemField label = 'Words' field = 'words'/>
                <ItemField label = 'Titles' field = 'titles'/>
                <ItemField label = 'Overlord' field = 'overlord'/>
                <ItemField label = 'Ancestral Weapons' field = 'ancestralWeapons'/>
            </RandomItem>
        )

        return (
            <>
                {click ? '' : randomItem}
                <Button onClick = {this.onToggleBtn} color="primary" size="lg" block>Toggle Open/Close</Button>
                <RowBlock leftBlock = {groupList} rithtBlock = {itemDetails}/>
            </>
        );
    }
}