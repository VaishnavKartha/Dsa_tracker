import React from 'react'
import {Dot, ExternalLink} from 'lucide-react'
import {Link} from 'react-router-dom'

const Questioncard = ({qno,question,markasDone}) => {

  return (
    <div onClick={markasDone} 
        className={`my-4 p-2 border border-border rounded-lg grid grid-cols-3 cursor-pointer ${question.isDone ? "bg-green-800":""}`}>

        <span>
            {qno}
        </span>

        <div>
            <div className='flex items-center gap-2'>
                
                {question.question_name}

                <a href = {question.leetcode_link} 
                target='_blank' 
                rel="noopener noreferrer" 
                onClick={(e)=>e.stopPropagation()}
                className='text-blue-500 hover:text-blue-300'>
                    <ExternalLink size={"16px"} />
                </a>
            </div>

            <div className='text-[12px] bg-border w-fit px-2 py-0.5 rounded-lg'>
                <span className='flex'><Dot/>{question.topic}</span>
                
            </div>

        </div>

        <span 
            className={`self-center justify-self-end w-fit rounded-full px-2 ${question.difficulty === "Easy"?"bg-green-400/60":question.difficulty === "Medium" ? "bg-yellow-300/60":"bg-red-600/40"}`}>

            {question.difficulty}
        </span>
      
    </div>
  )
}

export default Questioncard
