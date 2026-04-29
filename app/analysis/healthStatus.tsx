import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from "axios";
import {useState, useEffect} from "react";
import { supabase } from '@/utils/supabase';

// interface todos{
//         id: number,
        
//     }
const healthStatus = () => {

  const [response, setResponse] = useState<string | null>(null);

  // const  [todos, setTodos] = useState<any[]>([]);


  // const getResponse = () => {
  //  axios.get("https://sustainer-sufferer-dormitory.ngrok-free.dev/getResponse")
  //   .then((resp) =>{
  //     console.log("response: ",resp.data.data)
  //     setResponse(resp.data.data)
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   })
    
  //   // console.log("response: ",response)

  // };

  // const getData = async () => {
  //   try{

  //     const {data: todos, error} = await supabase.from('todos').select("*");

  //     if(error)
  //     {
  //       console.error("Error fetching data", error.message);
  //       return
  //     }
  //     if (todos && todos.length > 0){
  //       console.log("todos:", todos);
  //       setTodos(todos || []);
  //     }

  //   }catch(error)
  //   {
  //     console.error("Error fetching data", error.message)
  //   }
  // }

 
  return (
    <SafeAreaView>
      <TouchableOpacity className="list-action mt-6 ml-4 mr-4" onPress={() => getData()}>
          <Text className="list-action-text">Get</Text>
      </TouchableOpacity>

      {/* {todos.map((item) =>(
        <>
        <Text className="mt-6 ml-4 mr-4 pl-5" key={item.id}>{item.task}</Text>
        <Text className="mt-6 ml-4 mr-4 pl-5" key={item.id}>{item.allocated_time}</Text>
        </>
        
      ))} */}
      
      {/* {
        !response ?
          <Text className="mt-6 ml-4 mr-4 pl-5">No Response</Text>
          :
          <Text className="mt-6 ml-4 mr-4 pl-5">{JSON.stringify(response)}</Text>
      } */}
      
    </SafeAreaView>
  )
}

export default healthStatus