import React, { useState, useEffect, Fragment, useContext } from 'react';
import MyContext from '../../context/MyProvider'
import Timer from '../Atoms/Timer'
const Shuffle=(a)=>{
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
  }
export default function GameLogic (props) {
    //timer context
    const state = useContext(MyContext);
    //console.log(state)
        /* Me hubiera gustado crear un couter que se recarge cada vez que pasas de pregunta y en vez de tenerlo fuera queria poder ponerlo en el context para que segun el estado en el que este el juego, ir cambiandolo si ha cambiado las pregunta se responden bien poder reiiciarlo. He probado mil maneras y no consigo ver por que no me devuelve lo que tengo guardado en el context, seguramente me haya complicado la vida y haya una manera mucho mas simple de hacerlo... pero se me ha ido, me he bloqueado y como no quería pasarme del tiempo dado, hasta aqui he llegado, mañana con calma lo retomo porque esto no se queda aqui XD */



    //game parts
    const [gameStatus, setGame]= useState('startGame')
    //map for filter by all posible categories
    const [categories, setCategories]= useState()
    //filters game by default
    const [category, setCategory] = useState('9')
    const [difficulty, setDificulty]= useState('easy')
    const [type, setType]= useState('multiple')
    //questions trivial results
    const [questions, setQuestions]= useState()

    //question used to play
    const [question, setQuestion]=useState({
        question:'',
        answers:''
    })


    useEffect(()=>{
        //return all categories
        fetch('https://opentdb.com/api_category.php')
        .then(res=>res.json())
        .then(data=>setCategories(data))
    }, [])
   

    const chooseQuestions = (e) => {
        e.preventDefault();
        if(category !== undefined || difficulty !== undefined || type !== undefined){
        fetch(`https://opentdb.com/api.php?amount=50&category=${category}&difficulty=${difficulty}&type=${type}`)
        .then(res=>res.json())
        .then(data=>setQuestions(data))
        } else{
            
            fetch(`https://opentdb.com/api.php?amount=50&type=multiple`)
            .then(res=>res.json())
            .then(data=>setQuestions(data))
        }
        //change game status
        setGame('playingGame')
        
    }
    useEffect(()=>{
        //after trival questions are saved
        if(questions){
            let firstQuestion=questions.results[0].question
            //save all the answer of the question in the same array 
            let answers=questions.results[0].incorrect_answers
            answers.push(questions.results[0].correct_answer)
            Shuffle(answers) 
            
            setQuestion((prevState)=>({...prevState,question:firstQuestion, answers:answers}))

            
            
            
        }
    },[questions])

    const handleAnswer=(e)=>{
       
        //if you click on the correct answer
        if(questions.results[0].correct_answer===e.target.value){
            //show correct message
            setQuestion((prevState)=>({...prevState, correct:true, incorrect:false}))

            //cut out question if it is correct
            questions.results.splice(0,1)
            setQuestions((prevState)=>({...prevState,  results:questions.results}))
            //useefect is reloading and chenging the question
            
        }else{
            //show incorrect
            setQuestion((prevState)=>({...prevState, incorrect:true, correct:false}))
        }


    }
          
    
    const gameState = {
        startGame: () => (
        <Fragment>
            {categories ? 
            <form>
                <label>Select category</label>
                <select onChange={(e)=>setCategory((e.target.value))}>
                    {categories.trivia_categories.map((category, index)=>{
                    return(
                        <option value={category.id} key={index}>{category.name}</option>
                    )})} 
                </select>
                <label>Select dificulty</label>
                <select onChange={e => setDificulty(e.target.value)}>
                    <option value='easy'>Easy</option>
                    <option value='medium'>Medium</option>
                    <option value='dificult'>Dificult</option>
                </select>
                <label>Select type of questions</label>
                <select onChange={e => setType(e.target.value)}>
                    <option value='multiple'>Multiple</option>
                    <option value='boolean'>True/False</option>
                </select>
                <button onClick={chooseQuestions}>Play</button>
            </form>
            :<h1>loading..</h1>
             }
            </Fragment>),

        playingGame:()=>(
            <Fragment>
            {question.question !== '' 
            ? <div>
                    <h1>Start playing</h1>
                    <Timer/>
                    <h3 >{question.question}</h3>
                    <div>{question.answers.map((answer, index)=>{
                        return (
                            <button key={index} value={answer} onClick={handleAnswer}>{answer}</button>
                        )
                    })}</div>
                   {question.incorrect?
                   <h4>INCORRECT!</h4>: <h4></h4>}
                   {question.correct?
                   <h4>CORRECT!</h4>: <h4></h4>}
                    
                </div>
            

            :   <h1>loading questions...</h1>
                }
               
            </Fragment>
        ),
        gameOver:()=>(<h1>game over</h1>)
    }

   
    return(
        <Fragment>
         {gameState[gameStatus]()}
        </Fragment>
    )
}
