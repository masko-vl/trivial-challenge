export const categories =(url)=>{
    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        console.log(myJson);
        
    });
}