import { useState } from 'react'
import './App.css'

function App() {



  let [result, setResult] = useState('')
  const [calcR, setCalcR] = useState({'minus':[],'plus':[],'division':[],'multiply':[]})
  
  const priority = ['x','/',,'+','-']

  
  function mathResult(type, array=''){
    let auxNum=''
    let auxSum =0
    let partDone=false
    let exp=''
  
    if(array.includes(type)){
      for (let char of array){
        if (!isNaN(char)){
          auxNum+=char
        }
        else{
          exp+=char
          if (char==type && auxSum==0 ){
            
            partDone=true
            auxSum=auxNum
            
            auxNum=''
          }else{
            if(partDone){
                let del = auxSum.length
                let dell = auxNum.length
              auxSum=auxResult(type,[parseInt(auxSum),parseInt(auxNum)])
              partDone=false
              array=array.split(type)
              let bckup=''
              for (let i=0;i<array.length;i++){
                if (i>1){
                  bckup+=type+array[i]
                }
              }
              array=array[0].slice(0,-del)+auxSum+array[1].slice(dell)+bckup
              break
            }else{
            auxNum=''
          }
        }
        }
      }
    }
    return(array)
}

  function auxResult (type, array){

    if (array.length==1){
      return array[0]
    }
      if (type=='x'){
        return array[0]*array[1]
      }else if (type=='/' || type=='÷'){
        return parseInt(array[0])/parseInt(array[1])
      }else if (type=='+'){
        return array[0]+array[1]
      }else if (type=='-'){
        return array[0]-array[1]
      }
  }
  let count=-1
  function calc(type, text){


    if (result.length!=0 && '123456789'.includes(result[result.length-1])  || type=='nmb'){
      
      type=='som'?'':setResult(result+text)
    }

    if (type=='del'){
      if (result.length==1){
      setResult(result.slice(0,0))}
      else{
        setResult(result.slice(0,-1))
      }
      return
    }

    switch (type){
      
      case 'clear':
        setResult('')
        setCalcR({'minus':[],'plus':[],'division':[],'multiply':[]})
        break;

        case 'som':
          if (!isNaN(result[result.length-1]) && isNaN(result)){
            result+='x'
          }
          if (!isNaN(result)){
            break
          }
          while (count<20) {
            if (!isNaN(result.slice(0,-1))){
              setResult(result.slice(0,-1))
              break
            }else{
              for (let expp of priority){
                if (result.slice(0,-1).includes(expp)){
            result=mathResult(expp,result)
            break
          }
          }}
            count++
          }
          
        break;

    }
  }



  return (
    <>
    <div className="Calculadora">
      <div className="resultado">{result}</div>
      <div className="keys">
        <div onClick={()=>{calc('del','←')}}>←</div>
        <div onClick={()=>{calc('/','/')}}>÷</div>
        <div onClick={()=>{calc('clear','C')}}>C</div>
        <div onClick={()=>{calc('dflt','-')}}>-</div>
        <div onClick={()=>{calc('nmb','1')}}>1</div>
        <div onClick={()=>{calc('nmb','2')}}>2</div>
        <div onClick={()=>{calc('nmb','3')}}>3</div>
        <div onClick={()=>{calc('x','x')}}>x</div>
        <div onClick={()=>{calc('nmb','4')}}>4</div>
        <div onClick={()=>{calc('nmb','5')}}>5</div>
        <div onClick={()=>{calc('nmb','6')}}>6</div>
        <div onClick={()=>{calc('+','+')}}>+</div>
        <div onClick={()=>{calc('nmb','7')}}>7</div>
        <div onClick={()=>{calc('nmb','8')}}>8</div>
        <div onClick={()=>{calc('nmb','9')}}>9</div>
        <div onClick={()=>{calc('som','=')}}>=</div>
        
      </div>
    </div>
    </>
  )
}

export default App
