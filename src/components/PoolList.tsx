import * as React from 'react';

type ListProps = {
    items: Array<Number>;
};

export const List = ({ items }: ListProps) => (
    <ul>
        {items.map((item, key) => (
            <li key={key}>{item}</li>
        ))}
    </ul>
);
