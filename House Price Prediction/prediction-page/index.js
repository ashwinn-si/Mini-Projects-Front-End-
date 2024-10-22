document.getElementById('returnButton').addEventListener('click',()=>{

    window.location.href="../index.html";
});

predicted_values=JSON.parse(localStorage.getItem('result_values'));

displayChanger();

function displayChanger(){

    let container =document.getElementById('result_container');

    for(let i=0;i<11;i++){
        let year=2024+i;

        container.innerHTML+=`<div class="sub_container">
            <div>
                <p>${year}</p>
            </div>
            <div>
                <p>₹ ${predicted_values[i]}</p>
            </div>
        </div>`
    }

}