/**
 * Created by amanjain on 14/08/16 at 4:59 PM.
 * Description :
 */


import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import StatComponent from './statComponent';
import styles from './stats.scss';
import Stats from '../../constants/stats';
import {updateUsageStat} from '../../actions'

class StatsComponents extends Component {
    render() {
        const {usageStat} = this.props;

        if (!usageStat) {
            return <div/>;
        }

        return (
            <ul className="clearfix">
                {
                    Object.keys(Stats).map((statKey) => {
                        const statDetails = Stats[statKey];
                        return (
                            <li className="lfloat stat-container-list spr">
                                <StatComponent {...statDetails} value={usageStat[statKey] || 0}/>
                            </li>
                        )
                    })
                }
            </ul>
        );
    }

    componentDidMount() {
        fetch('/api/usageStats').then((reponse) => {
            return reponse.json();
        }).then((reponse) => {
            console.log(reponse);
            this.props.onUsageStatsUpdate(reponse);
        })
    }

    componentWillUnmount() {
        console.log('unmount');
    }
}

const mapStateToProps = (state) => {
    return {
        usageStat: state.usageStat
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onUsageStatsUpdate: (usageStats) => {
            dispatch(updateUsageStat(usageStats))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StatsComponents);
