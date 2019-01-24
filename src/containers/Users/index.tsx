import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectUsers } from '../../selectors/users';

type UsersProps = {
    users: any;
};

class Users extends React.Component<UsersProps> {
    render() {
        return (
            <div>
                {this.props.users.size &&
                    this.props.users.map((user: any, key: any) => (
                        <li key={key}>
                            {user
                                .get('Attributes')
                                .find((x: any) => x.get('Name') === 'email')
                                .get('Value')}
                        </li>
                    ))}
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    users: selectUsers()
});

const withConnect = connect(mapStateToProps);
export default compose(withConnect)(Users);
