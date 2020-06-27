import React, { memo } from 'react'

const InfoBox = (props) => {

    const { title, customClass, children } = props;

    return(
        <div className={`info-box material ${customClass}`}>
            <span className="info-title">{title}</span>
            <div className="info-content hide-scrollbar">
                {children}
            </div>
        </div>
    )
}

export default memo(InfoBox)