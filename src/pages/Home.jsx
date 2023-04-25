import React, { useState, useEffect } from 'react'
import { Loader, Card, FOrmfield } from "../components"


const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return (
      data.map((post) => <Card key={post._id} {...post} />)
    );
  }

  return (
    <h2 className="mt-5 font-bold text-[#6469ff] text-xl ">{title}</h2>
  );
};



const Home = () => {
  const [loading, setloading] = useState(false)
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setsearchText] = useState("")
  const [searchresults, setSearchresults] = useState(null);
  const [searchtimeout, setSearchtimeout] = useState(null);
  const fetchposts = async () => {
    setloading(true);
    try {
      const response = await fetch("http://localhost:5000/api/v1/post", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      })
      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
      }
    } catch (error) {
      alert(error);
    }
    finally {
      setloading(false);
    }
  }

  useEffect(() => {
    fetchposts();
  }, [])


  const handleSearchChange = (e) => {
    clearTimeout(searchtimeout);
    setsearchText(e.target.value);

    setSearchtimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
        setSearchresults(searchResult);
      }, 500),
    );
  }
  return (
    <section className='max-w-7xl mx-auto'>
      <div className=''>
        <h1 className='text-[32px] font-extrabold text-[#222328] font-Inter'> The community Showcase</h1>
        <p className='mt-2 text-[#666e75] text-[16px] max-w-[650px]'>
          Browse Through a Collection of Visually stunning images generatetd by DALL-E-AI
        </p>
      </div>

      <div className='mt-16'>
        <FOrmfield
          labelName="Search posts"
          type="text"
          name="text"
          placeholder="Search something..."
          value={searchText}
          handleChange={handleSearchChange} />
      </div>
      <div className='mt-10'>
        {
          loading ? (<div className='items-center flex justify-center'>
            <Loader />
          </div>) : (<>
            {
              searchText && (
                <h2 className='font-medium text-xl text-[#666e75] mb-3'>
                  showing results <span className='text-[#222328] '>{searchText}</span>
                </h2>
              )
            }
            <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
              {searchText ? (
                <RenderCards
                  data={searchresults}
                  title="No Search Results Found"
                />
              ) : (
                <RenderCards
                  data={allPosts}
                  title="No Posts Yet"
                />
              )}
            </div>
          </>)
        }
      </div>
    </section>
  )
}

export default Home