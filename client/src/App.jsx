import { useEffect } from "react"
import axiosInstance from "./utils/config"
import Questioncard from "./components/Questioncard"
import { useState } from "react"
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function App() {

  const [questions,setQuestions] = useState([]);
  const [searchTerm,setSearchTerm] = useState("")
  const [queryString,setQueryString] = useState("")
 

  useEffect(()=>{

    const getQuestions = async()=>{

      try {

        const {data} = await axiosInstance.get("/");
        //console.log(data)
        setQuestions(data.questions)
        

        
      } catch (error) {
        console.log(`Error while fetching ${error.message}`)
        setQuestions([])
        
      }

       

    }

    getQuestions()

   
  },[])



  const searchTopic=(e)=>{
    if (e.key === "Enter"){

      setSearchTerm(queryString.trim());
      

    }
    
  }


  const displayQuestions = searchTerm === "" ? questions : questions.filter(q => q.topic.toLowerCase().startsWith(searchTerm.toLowerCase()));

  

  const tracker = {
    easyTotal :  displayQuestions.filter(q=>q.difficulty === "Easy").length,
    easyCompleted:  displayQuestions.filter(q=>q.isDone && q.difficulty === 'Easy').length,
    mediumTotal : displayQuestions.filter(q=>q.difficulty === "Medium").length,
    mediumCompleted:  displayQuestions.filter(q=>q.isDone && q.difficulty === 'Medium').length,
    hardTotal :  displayQuestions.filter(q=>q.difficulty === "Hard").length,
    hardCompleted:  displayQuestions.filter(q=>q.isDone && q.difficulty === 'Hard').length,
  }



  //console.log(questions)

  const markDone=async(index,question)=>{
    console.log(index,question)

   

    try {
      
     const temp = questions.map((q) => {
     if (q._id === question._id) {
          return {
              ...q,
              isDone: !q.isDone,
          };
      }
      return q;
    });

      const {data} = await axiosInstance.put(`/${question._id}`,{isDone : !question.isDone})
      console.log(data)
      

      
      setQuestions(temp)
      
    } catch (error) {
      setQuestions(questions)
      console.log(error);
      
    }finally{

    }

  }

  const calculatePercent=()=>{
    const completedQuestions =  displayQuestions.filter((q,i)=>q.isDone === true).length;
    const totalQuestions =  displayQuestions.length;

    const percent = Number((completedQuestions / totalQuestions )* 100).toFixed(2);
    console.log(percent)

    return percent
  }

  //console.log(queryString)

  
  

  return (
    <>
    <div className="w-full">
      <input
      type="text"
      value={queryString}
      onChange={(e)=>{
        const value = e.target.value
        setQueryString(value)

        if (!value.trim()) {
          setSearchTerm("")
        }
      }}
      onKeyDown={searchTopic}
      placeholder="search..."
      className="p-2 w-full border border-border rounded-full focus:outline-0"/>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 h-full w-full bg-bg">

      <div  className="flex gap-4 justify-center items-center ">


        <div className="w-[40%] relative">

          <CircularProgressbar 
          value={calculatePercent()} 
          strokeWidth={5} 
          styles={buildStyles({
            pathColor:`green`,
            
          })}/>

          <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
            <span className="text-3xl pb-4">{calculatePercent()}%</span>

            <span>{Math.round((calculatePercent()* displayQuestions.length)/100)}/{ displayQuestions.length}</span>
          </div>

      
        </div>



        <div className="flex flex-col gap-2">
          
          <div className="diff-group bg-green-400/20 ">
            <p className="">Easy</p>
            <p>{tracker.easyCompleted}/{tracker.easyTotal}</p>
          </div>

          <div className="diff-group bg-yellow-300/60">
            <p>Medium</p>
            <p>{tracker.mediumCompleted}/{tracker.mediumTotal}</p>
          </div>

          <div className="diff-group bg-red-600/40">
            <p>Hard</p>
            <p>{tracker.hardCompleted}/{tracker.hardTotal}</p>
          </div>

        </div>



      </div>


      <div className="h-screen overflow-scroll no-scrollbar">

        { displayQuestions.length > 0 &&  displayQuestions?.map((question,i)=>{
          return <Questioncard key={question._id} qno={i+1} question={question} markasDone={()=>markDone(i,question)}/>
           
        })}

      </div>

    </div>
    </>
  )
}

export default App
