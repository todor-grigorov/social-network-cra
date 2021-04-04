import React from 'react'

const TabPanel = (props) => {
    const { children, value, index, className, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            className={className}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && (
                <div >
                    {children}
                </div>
            )}
        </div>
    );
}

export default TabPanel
