import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";


interface Content {
  _id:string;
  contentid: string;
  title: string;
  link?: string;
  type: "twitter" | "youtube" | "note" | "link";
  createdAt:string;
}

export function useContent(){
const [contents,setContents]=useState<Content[]>([]);
 function refresh(){
    axios.get(BACKEND_URL+"/api/v1/getcontent",{
    headers:{
        "Authorization":localStorage.getItem("token")
    }
})
   .then((response)=>{
   if (Array.isArray(response.data)) {
        setContents(response.data);
      } else {
        setContents([]); // fallback to empty array if backend doesn't return expected shape
      }
    }) 
  }


useEffect(()=>{
  refresh();
let interval=  setInterval(()=>{
    refresh();
   },10*1000)
   return ()=>{
    clearInterval(interval)
   }
},[])

return {contents,refresh,setContents};


}