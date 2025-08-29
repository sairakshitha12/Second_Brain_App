import { useState } from 'react'
import '../index.css';
// import './App.css'
import { Button } from '../components/button'
import { PlusIcon } from '../icons/plusIcon';
import { ShareIcon } from '../icons/shareicon';
import { Card } from '../components/cards';
import { AddContent } from '../components/Addcontent';
import { SideBar } from '../components/sidebar';
import { useContent } from '../hooks/useContent';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { ShareBrain } from '../components/shareButton';

function Dashboard() {
  const [model, setModel] = useState(false)
  const { contents, refresh, setContents } = useContent();
  const [filter, setFilter] = useState<string>("all");


  const deleteHandler = async (_id: string) => {
    try {
      await axios.delete(BACKEND_URL + "/api/v1/delete", {
        data: { _id },
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setContents((prev) => prev.filter((item) => item._id !== _id));
    } catch (error) {
      console.log("Delete failed :", error)
    }
  }

const filteredContents = contents.filter((item) => {
    if (filter === "all") return true;
    return item.type === filter;
  });
  return (
    <>
      <div >
        <SideBar onFilterSelect={setFilter} />
        
        <div className="p-3 ml-72 min-h-screen bg-gray-100 ">
          <AddContent open={model}
            onClose={() =>
              setModel(false)}
            onContentAdded={refresh} />

          {/* //  onContentAdded={refresh} */}

          <div className='p-3 flex items-center justify-between mb-2'> 
             <h1 className=' text-3xl font-semibold text-shadow-md '>Add Notes</h1>
          <div className='flex gap-4'>
           
            <Button onClick={() => {
              setModel(true)
            }} variant='secondary' text='Add Content' size='md' 
            startIcon={<PlusIcon />}/>
             <ShareBrain/>
            {/* <Button size='lg' variant='secondary' text='Add Content'/> */}
          </div>
          </div>
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 pt-5">
            {filteredContents.map(({ _id, type, link, title,createdAt }) => (
              <div
                key={_id}
                className="mb-4 break-inside-avoid rounded-2xl"
              >
                <Card
                  type={type}
                  link={link}
                  title={title}
                   createdAt={createdAt} 
                  contentid={_id}
                  onDelete={deleteHandler}
                />
              </div>
            ))}
          </div>


        </div>

      </div>
    </>

  )
}

export default Dashboard
