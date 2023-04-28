import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { preview } from '../assets'
// import {surpriseMePrompts} from "../constant"
import { getRandomPrompt } from '../Utils'
import { FOrmfield,Loader } from '../components'

const CreatePost = () => {
  const navigate=useNavigate();
  const [form,setForm]=useState({
    name:"",
    prompt:"",
    photo:"",
  })
const[generateImg,setgenerateImg]=useState(false);
const[loading,setLoading]=useState(false);

const GenerateImage=async()=>{
if(form.prompt){
  try {
    setgenerateImg(true);
    const response=await fetch("https://aiimage-backend.vercel.app/api/v1/dalle",{
      method:"POST",
    headers:{
      "Content-type":"application/json"
    },
    body :JSON.stringify({prompt:form.prompt})
    }
    );
    const data=await response.json();
    setForm({...form,photo:`data:image/jpeg;base64,${data.photo}`})
  } catch (error) {
    alert(error);
    // console.log(error)
  }
  finally{
    setgenerateImg(false);
  }
}
else{
  alert("please enter a prompt");
}
}

const handleSubmit=async(e)=>{
e.preventDefault();
if(form.prompt && form.photo){
  setLoading(true);
  try {
    const response=await fetch("https://aiimage-backend.vercel.app/api/v1/post",{
      method:"POST",
        headers:{
          "Content-type":"application/json",
        },
        body:JSON.stringify({...form})
    })

    await response.json();
    navigate("/");
  } catch (error) {
    alert(error);
  }
  finally{
    setLoading(false);
  }
}
else{
  alert("please enter a prompt to generae Image");
}
}



const handleChange=(e)=>{
  setForm({ ...form, [e.target.name]: e.target.value })
}
const handleSurprise=()=>{
const randomprompt=getRandomPrompt(form.prompt);
setForm({...form,prompt:randomprompt})

}

  return (
    <section className='max-w-7xl mx-auto '>
    <div className=''>
        <h1 className='text-[32px] font-extrabold text-[#222328] font-Inter'> Create</h1>
        <p className='mt-2 text-[#666e75] text-[16px] max-w-[650px]'>
        Create a imaginatary images and share them with the community
        </p>
      </div>

      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
        <div className='gap-5 flex flex-col'>
          <FOrmfield labelName="your name" type="text" name="name" placeholder="Rahul Chatterjee" value={form.name}
            handleChange={handleChange}
          />
          <FOrmfield labelName="your prompt" type="text" name="prompt" placeholder="a bowl of soup that looks like a monster, knitted out of wool" value={form.prompt} 
            handleChange={handleChange} isSurprise handleSurprise={handleSurprise}
          />
          <div className='relative bg-gray-50 border border-gray-500 text-md  rounded-lg focus:ring-blue-500 focus:border-blue-500 w-80 h-64 flex justify-center items-center p-3 '>
            {
              form.photo?(
                <img className="w-full h-full object-contain" src={form.photo} alt={form.photo}/>
              ):(<img className='w-9/12 h-9/12 object-contain opacity-40' src={preview} alt='preview'/>)
            }
            {
              generateImg &&(
                <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'> 
                <Loader/>
                </div>
              )
            }
          </div>
        </div>
        <div className='mt-5 flex gap-5 '>
            <button type='button' onClick={GenerateImage} className='text-white font-medium bg-green-500 rounded-md text-md w-full sm:w-auto px-5 py-2.5 text-center'>
              {
                generateImg?"Generating...":"Click for Generate"
              } 
            </button>
        </div>
        <div className='mt-20'>
              <p className='mt-2 text-[14px] text-[#666e75]'>Once you have created you can share in the community</p>
              <button type='submit' className='px-4 py-2 bg-[#666e75] rounded-md mt-3 text-white
              text-sm w-full xs:w-auto text-center '>
              {
                loading?"Sharing......":"Share with the Community"
              }
              </button>
        </div>
      </form>
    </section>
  ) 
}

export default CreatePost