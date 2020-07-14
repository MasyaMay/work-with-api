import React from 'react';
import {Col, Row} from 'reactstrap';

const RowBlock = ({leftBlock, rithtBlock}) => {
    return (
        <Row>
            <Col md='6'>
                {leftBlock}
            </Col>
            <Col md='6'>
                {rithtBlock}
            </Col>
        </Row>
    )
}

export default RowBlock;