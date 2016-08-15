/**
 * Created by amanjain on 15/08/16 at 5:47 PM.
 * Description :
 */


import React, {Component, PropTypes} from 'react';

const StatComponent = ({IconComp, label, value}) => (
    <div className="stat-container">
        <IconComp className="sc-icon"/>
        <div className="sc-details vert-center">
            <div className="sc-det-value">{value}</div>
            <div className="sc-det-label">{label}</div>
        </div>
    </div>
);

export default StatComponent;
