import React from 'react';
import './loading.styles.scss';

export const Spinner = () => (
    <div className="spinner-overlay">
    <div className="spinner-container"></div>
    </div>
)

const WithSpinner = function(WrappedComponent) {
    return function ({ isLoading, ...otherProps }) {
        return isLoading ? (
            <div className="spinner-overlay">
                <div className="spinner-container"></div>
            </div>
        ) : (
        <WrappedComponent {...otherProps} />)
    }
}
export default WithSpinner;