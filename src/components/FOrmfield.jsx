import React from 'react'

const FOrmfield = ({labelName,type,name,placeholder,value,handleChange,isSurprise,handleSurprise}) => {
  return (
    <div>
      <div className='flex items-center gap-2 mb-2'>
      <label htmlFor={name} className='block text-sm  font-medium text-gray-900 pl-[12px]'>
        {labelName}
      </label>
      {
        isSurprise && (<button className='font-semibold bg-[#ECECF1] px-2 py-2 text-xs text-black rounded-[10px]' type='button' onClick={handleSurprise}>
        Surprise Me!
        </button>)
      }
      </div>
      <input type={type} id={name} value={value} name={name} placeholder={placeholder} onChange={handleChange} required className='bg-gray-50 border-black rounded-lg text-black text-sm focus:ring-[#4649ff] focus:border-[#4649ff] w-full p-4 outline-none flex' />
    </div>
  )
}

export default FOrmfield