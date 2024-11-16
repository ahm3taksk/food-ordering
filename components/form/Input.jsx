import React from 'react'

const Input = (props) => {
  const {type, errorMessage, touched, placeholder, ...inputProps} = props;
  return (
    <div className='w-full'>
        <label className='relative block cursor-text w-full'>
            <input type={type} {...inputProps} className={`h-14 w-full border outline-none px-4 peer ${type !== "datetime-local" && "pt-2"} ${touched && errorMessage ? "border-danger" : "border-primary"}`} required/>
            {type !=='datetime-local' &&
              <span className='absolute top-0 left-0 px-4 text-sm flex items-center transition-all h-full peer-focus:h-7 peer-focus:text-xs peer-valid:h-7 peer-valid:text-xs'>
                {placeholder}
              </span>
            }
        </label>
        {touched && errorMessage && <span className='text-danger text-xs'>{errorMessage}</span>}
    </div>
  )
}

export default Input