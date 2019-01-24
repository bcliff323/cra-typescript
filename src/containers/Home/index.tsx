import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectUserPools } from '../../selectors/users';

type HomeProps = {
    userPools: any;
};

class Home extends React.Component<HomeProps> {
    render() {
        return (
            <div>
                {this.props.userPools.map((user: any, key: any) => (
                    <li key={key}>
                        <a href={`/users?poolId=${user.get('id')}`}>
                            {user.get('name')}
                        </a>
                    </li>
                ))}
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    userPools: selectUserPools()
});

const withConnect = connect(mapStateToProps);
export default compose(withConnect)(Home);
