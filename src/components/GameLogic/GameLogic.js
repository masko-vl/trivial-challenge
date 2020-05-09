import React, { useState, useEffect, Fragment } from 'react';

export default function GameLogic () {
    const [categories, setCategories]= useState()
    const [category, setCategory] = useState()
    const [difficulty, setDificulty]= useState()
    const [type, setType]= useState()
    const [questions, setQuestions]= useState()

    useEffect(()=>{
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
            //dont finished
            fetch(`https://opentdb.com/api.php?amount=50&type=multiple`)
            .then(res=>res.json())
            .then(data=>setQuestions(data))
        }
    }
        
   
    return(
        
        <Fragment>
        {console.log(categories)}
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
        </Fragment>
    )
}
