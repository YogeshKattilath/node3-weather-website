console.log('front.js is ready');

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })



const weatherForm = document.querySelector('form')
const search_input = document.querySelector('input') 
const error_msg = document.querySelector('#error_msg')
const success_msg = document.querySelector('#success_msg')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const locataion = search_input.value
    console.log(locataion)
    error_msg.textContent = 'Loading......'
    error_msg.textContent = ''
    fetch('/weather?address='+locataion).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                error_msg.textContent = data.error
            }else{
                console.log(data);
                success_msg.textContent = data.location+' '+data.forecast.data
                // console.log(data.locataion)
                // console.log(data.forecast)
            }
        })
    })
})