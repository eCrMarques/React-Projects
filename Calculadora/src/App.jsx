
import { useState } from 'react'
import './App.css'


function App() {

  let [result, setResult] = useState('') // Resultado dos calculos, let Para poder alterar sem necessariamenter usar o setResult

  const priority = ['x','÷','-','+']  // Prioridade de expressões nos calculos, Respectivamente da Maior priodade a Menor
  
  let count=-1
  
  function mathResult(type, array=''){
    // type <- expoente Matematico recebe da const priority 'x','÷','-','+'
    // array recebe a Expressão númerica  (1+2x8-5)

    // Auxilia em Valores Numericos auxSum <- Primeiro valor  , auxNum <- Segundo valor , bckup <- Soma Resultante dos Valores
    let auxNum = ''
    let auxSum = 0
    let bckup=''

    let partDone = false // Verificação pra efetuar a Soma de dois Valores
    let exp = '' // Armazena expoente

    if(array.includes(type)){ 
      // Verificação se o type esta incluso no array
    
      for (let char of array) // acessa cada Caractere do Array
      {
        if (!isNaN(char) || char=='.' || (char=='-' && char==array[0])){  // Verificação se o caractere é um Numero, ponto, menos e igual ao primeiro valor do array
          auxNum+=char // Adiciona um Numero
        }
        else{ // + , x , - 
          exp+=char  // Adiciona o expoente matematico

          if (char==type && auxSum==0 || (array[0]=='-' && type=='-'  && exp.length==1)){ 
            // Verifica se o caractere atual é igual ao expoente type e se o valor Secundario está Vazio

            partDone=true // Atribui verdadeiro para a primeira Parte do calculo
            auxSum=auxNum // Primeiro Valor para o Calculo
            auxNum='' // Esvazia para o Segundo Valor
            
          }else{
            if(partDone){
              // Se primeira parte do calculo estiver concluida 

                let del = auxSum.length // valor para refazer o array principal
                let dell = auxNum.length // valor para refazer o array principal

              auxSum=auxResult(type,[parseFloat(auxSum),parseFloat(auxNum)]) // Recebe o resultado do calculo atravez do expoente e dos Valores

              partDone=false // Termina A parte

              array=array.split(type) // Divide o Calculo Geral para reorganização dos numeros

              for (let i=0;i<array.length;i++){
                // Verifica se o Calculo geral contem diversos array ['3','2+5','5',] <- 3 x 2+5 x 5
                
                if (i>1){
                  // Reorganiza os não Calculados repondo os expoentes
                  bckup+=type+array[i] 
                }

              }

              array= array[0].slice(0,-del-(auxSum<0?1:0)) + auxSum + array[1].slice(dell)+bckup // Re-arranja os Valores Com o Calculado utilizando dos del apagar
              break
            
            }else {
            auxNum='' // Caso a primeira parte do calculo esteja falsa retornar com valor zerado
          }
        }
        }
      }
    }
    return(array) // Retorna o Calculo Geral com uma parte Concluida
}

  function auxResult (type, array){
    // Soma da Parte dos Calculos

    if (array.length==1){
      return array[0] // Caso contenha somente um valor Retorne o Mesmo
    }
      if (type=='x'){
        return parseFloat(array[0])*parseFloat(array[1])
      }else if (type=='÷'){
        return parseFloat(array[0])/parseFloat(array[1])
      }else if (type=='+'){
        return parseFloat(array[0])+parseFloat(array[1])
      }else if (type=='-'){
        return parseFloat(array[0])-parseFloat(array[1])
      }
  }

  function calc(type, text){ // Função principal que Recebe e Altera os valores do Html 

    if (result.length!=0 && '0123456789'.includes(result[result.length-1])  || type=='nmb'){
      // Evita que expoentes se dupliquem no recente e permite inserir Números

      type=='som'?'':setResult(result+text) // Impede somar Valor nulo 
    }

    if (type=='del'){
      // Apaga os ultimos caracteres da Calculadora

      if (result.length==1){
      setResult(result.slice(0,0))}
      else{
        setResult(result.slice(0,-1))
      }
      return
    }

    switch (type){
      
      case 'clear':
        // Apaga todo o Calculo Geral da Calculadora
        setResult('')
        break;

        case 'som':
          // Soma do Calculo Geral

          if (!isNaN(result[result.length-1]) && isNaN(result)){
            result+='x' // Marca com x o Calculo Geral não resolvidop
          }

          if (!isNaN(result)){
            // Quebra se Já Resolvido
            break
          }
          
          while (count<30) { // Resolução dos calculos com contagem para evitar Loop infinito

            if (!isNaN(result.slice(0,-1))) {
              // Quebra o while Assim q o Calculo for Resolvido

              setResult(result.slice(0,-1))
              break

            }
  
            else{

              for (let expp of priority){
                // expp Expoente atual da lista Prioridade x,+,-,/

                if (result.slice(0,-1).includes(expp) && result[0]!=expp){
                  // Verificação se o expoente atual existe no Calculo e se não pertence a um numero negativo

                  result=mathResult(expp,result) // Leva o Calculo Geral para o Calculo das Partes referente ao expoente
                  break // Quebra para prosseguir somente quando o expoente não existir mais
          }

          if(count>20 && result.indexOf(expp,result.indexOf(expp)+1)!='-1'){
            // Resolver a soma de numeros negativos

              setResult(-auxResult('+',result.slice(1,-1).split('-')))
            }

          }
        }
            count++ // Contagem para a Quebra do loop
      }    
        break;
    }
  }


  return (
    <>
    <div className="Calculadora">
      <div className="resultado">{result}</div>
      <div className="keys">
      <div onClick={()=>{calc('x','x')}}>x</div>
        <div onClick={()=>{calc('÷','÷')}}>÷</div>
        <div onClick={()=>{calc('clear','C')}}>C</div>
        <div onClick={()=>{calc('del','←')}}>←</div>
        <div onClick={()=>{calc('nmb','1')}}>1</div>
        <div onClick={()=>{calc('nmb','2')}}>2</div>
        <div onClick={()=>{calc('nmb','3')}}>3</div>
        <div onClick={()=>{calc('minus','-')}}>-</div>
        <div onClick={()=>{calc('nmb','4')}}>4</div>
        <div onClick={()=>{calc('nmb','5')}}>5</div>
        <div onClick={()=>{calc('nmb','6')}}>6</div>
        <div onClick={()=>{calc('plus','+')}}>+</div>
        <div onClick={()=>{calc('nmb','7')}}>7</div>
        <div onClick={()=>{calc('nmb','8')}}>8</div>
        <div onClick={()=>{calc('nmb','9')}}>9</div>
        <div onClick={()=>{calc('som','=')}}>=</div>
        <div onClick={()=>{calc('nmb','')}}></div>
        <div onClick={()=>{calc('nmb','0')}}>0</div>
        <div onClick={()=>{calc('nmb','')}}></div>
        <div onClick={()=>{calc('nmb','')}}></div>
        
      </div>
    </div>
    </>
  )
}

export default App
