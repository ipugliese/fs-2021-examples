import React, { useState } from 'react';

const Toggable = ({children, buttonLabel}) => {
    const [visible, setVisible] = useState(false)

    const visibilityStyle = (show) => (show ? '' : 'none')

    const toggleVisibility = () => setVisible(!visible)

    const buttonVisibilityStyle = { display: visibilityStyle(!visible)}
    const childrenVisibilityStyle = { display: visibilityStyle(visible)}

    console.log('children: ', children)

    return (
        <div>
            <div style={buttonVisibilityStyle}>
                <button onClick={toggleVisibility}>{buttonLabel}</button>
            </div>
            <div style={childrenVisibilityStyle}>
                { children }
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
}

export default Toggable