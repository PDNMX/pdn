import React from 'react'
import PropTypes from 'prop-types';

export default function GroupTitles({ yearCenters }) {
    return (
        <g className="yearsTitles">
            {
                Object.keys(yearCenters).map(causa =>
                    <text
                        key={causa}
                        x={yearCenters[causa].x}
                        y={50}
                        fontSize="10"
                        textAnchor="middle"
                        alignmentBaseline="middle"
                    >
                        {
                            causa
                        }
                    </text>)
            }
        </g>
    )
}

GroupTitles.propTypes = {
    yearCenters: PropTypes.objectOf(PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }).isRequired).isRequired,
}
