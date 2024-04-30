url = 

window.addEventListener("load", ()=>{
    console.log('Script Started');
     main_script()
    console.log('Script Completed');
})

async function main_script(){

    machines = ["marcie","library", "aruna_mam", "angelle", "additional_1", "additional_2", "additional_3"]

    for (let index = 0; index < machines.length; index++) {
        const machine = machines[index];

        const values = await get_api(machine)
        elem = document.querySelector('#card_' + (index + 1) + ' span')
        elem.innerHTML = JSON.stringify(values[2], undefined, 2)
        header = document.querySelector('#card_' + (index + 1) + ' h6')
        meta = document.querySelector('#card_' + (index + 1) + ' p')
        header.innerText = 'Computer: ' + machine

        // // card data
        // time = values[2]["time"]
        // meta.innerHTML = `Status: <b>Active</b>, Pending: ${pending}<b></b>`

    }
        // other data
        // other = document.querySelector('#meta_data')
        // other.innerHTML = `Last Refreshed on: ${new Date().toLocaleTimeString() } Active: `
}

async function get_api(machine){
    const response = await fetch("https://fhr-json-status.vercel.app/" + machine)
    const data = await response.json();
    return getLast(data,3);
    
}

function getLast(array,x){return array.slice(array.length-x)}