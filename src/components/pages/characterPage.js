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

export default class CharacterPage extends Component {

    state = {
        idItem: null,
        error: false,
        click: false
    }
    gotService = new gotService();

    async componentDidMount() {
        try {
            const idItem = await this.gotService.getFirstCharacter();
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
                getData = {this.gotService.getCharacterAll}
                renderItem = {(item) => item.name}
            />
        )

        const itemRandom = click ? '' : (
            <RandomItem getData = {this.gotService.getCharacter}>
                <ItemField label = {'Gender'} field = {'gender'}/>
                <ItemField label = {'Born'} field = {'born'}/>
                <ItemField label = {'Died'} field = {'died'}/>
                <ItemField label = {'Culture'} field = {'culture'}/>
            </RandomItem>
        )

        const itemDetails = (
            <>
                <ItemDetails idItem = {idItem} getData = {this.gotService.getCharacter}>
                    <ItemField label = {'Gender'} field = {'gender'}/>
                    <ItemField label = {'Born'} field = {'born'}/>
                    <ItemField label = {'Died'} field = {'died'}/>
                    <ItemField label = {'Culture'} field = {'culture'}/>
                </ItemDetails>
                {itemRandom}
                <Button onClick = {this.onToggleBtn} color="primary" size="lg" block>Toggle Open/Close</Button>
            </>
        )

        return (
            <RowBlock leftBlock = {groupList} rithtBlock = {itemDetails}/>
        );
    }
}