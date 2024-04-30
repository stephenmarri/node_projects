url = 

window.addEventListener("load", ()=>{
    console.log('Script Started');
     main_script()
    console.log('Script Completed');
})

async function main_script(){

    machines = ["marcie","library", "aruna_mam", "angelle", "additional_1", "additional_2"]

    for (let index = 0; index < machines.length; index++) {
        const machine = machines[index];

        const values = await get_api(machine)
        elem = document.querySelector('#card_' + (index + 1) + ' span')
        elem.innerHTML = JSON.stringify(values[1], undefined, 2)
        header = document.querySelector('#card_' + (index + 1) + ' h6')
        header.innerText = 'Computer: ' + machine
        
    }
}

async function get_api(machine){
    const response = await fetch("https://fhr-json-status.vercel.app/" + machine)
    const data = await response.json();
    return getLast(data,3);
    
}

function getLast(array,x){return array.slice(array.length-x)}