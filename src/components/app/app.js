import React, {Component} from 'react';
import {Container} from 'reactstrap';
import Header from '../header';
import ErrorMessage from '../error';
import {CharacterPage, HousesPage, BooksPage, BooksItem, MainPage} from '../pages';
import {BrowserRouter as Router, Route} from 'react-router-dom'


export default class App extends Component {

    state = {
        error: false
    }

    componentDidCatch() {
        this.setState({error: true})
    }

    render() {
        const {error} = this.state;
        if (error) {return <ErrorMessage/>}

        return (
            <Router>
                <div className = 'app'>
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Route path='/' exact component = {MainPage}/>
                        <Route path='/characters' component = {CharacterPage}/>
                        <Route path='/houses' component = {HousesPage}/>
                        <Route path='/books' exact component = {BooksPage}/>
                        <Route path='/books/:id' render = { ({match}) => {
                            const {id} = match.params;
                            return <BooksItem idBooks = {id} />
                        }}/>
                    </Container>
                </div>
            </Router>
        );
    }
}
