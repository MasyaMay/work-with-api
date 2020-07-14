import React from 'react';
import { Jumbotron, Row, Col, Button } from 'reactstrap';
import RandomItem from '../randomItem';
import {ItemField} from '../itemBlock';
import gotService from '../../services/gotService'

const MainPage = () => {
    const service = new gotService();
    return (
        <div>
            <Jumbotron className = {"mt-5"}>
                <h1 className="display-3">An API of Ice And Fire</h1>
                <p className="lead">Data from the universe of Ice And Fire you've ever wanted!</p>
                <hr className="my-2" />
                <p>A source for quantified and structured data from the universe of Ice and Fire (and the HBO series Game of Thrones).</p>
                <Button outline color="secondary"><a href='https://anapioficeandfire.com/'>anapioficeandfire.com</a></Button>
                <Row>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                        <RandomItem getData = {service.getCharacter}>
                            <ItemField label = {'Gender'} field = {'gender'}/>
                            <ItemField label = {'Born'} field = {'born'}/>
                            <ItemField label = {'Died'} field = {'died'}/>
                            <ItemField label = {'Culture'} field = {'culture'}/>
                        </RandomItem>
                    </Col>
                </Row>
            </Jumbotron>
        </div>
    );
};

export default MainPage;