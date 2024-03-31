import React from 'react'

const getErrorMsg = (type) => {
    switch (type) {
        case 'minLength':
            return "Jumlah karakter tidak memenui minumum"
        case 'required':
            return "Input required"
    }
}
const ErrorInput = ({ error }) => {
    if (!error) {
        return <></>
    }
    const { type } = error;
    const message = getErrorMsg(type);
    return (
        <p className='text-left mt-1 text-red-500 text-xs mb-3'>{message}</p>
    )
}

export default ErrorInput