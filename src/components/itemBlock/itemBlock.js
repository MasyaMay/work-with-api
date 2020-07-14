import React from 'react';

const ItemField = ({post, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
        <span>{post[field]}</span>
        </li>
    )
}

const ItemBlock = ({name, post, props}) => {
    return (
        <div className="char-details rounded">
            <h4>{name}</h4>
            <ul className="list-group list-group-flush">
                {React.Children.map(props.children, child => {
                    return React.cloneElement(child, {post});
                })}
            </ul>
        </div>
    )
}

export {ItemField, ItemBlock};