url = 

window.addEventListener("load", ()=>{
    console.log('Script Started');
     main_script()
    console.log('Script Completed');
})

async function main_script(){

    machines = ["marcie","library", "aruna_mam", "angelle", "additional_1", "additional_2", "additional_3", "additional_4", "additional_5", "additional_6", "additional_7"]

    for (let index = 0; index < machines.length; index++) {
        const machine = machines[index];

        const values = await get_api(machine)
        elem = document.querySelector('#card_' + (index + 1) + ' span')
        elem.innerHTML = JSON.stringify(values[2], undefined, 2)
        header = document.querySelector('#card_' + (index + 1) + ' h6')
        meta = document.querySelector('#card_' + (index + 1) + ' p')
        header.innerText = 'Computer: ' + machine

        // card data
        if(values[2]){

            pending = values[2]["processing"]
            var matches = pending.match(/\[(.*?)\]/);
            color = "red";

            if (matches) {
                 pending = matches[1];
                 start = pending.split("/")[0]
                 end = pending.split("/")[1]
                 pending = parseInt(end) - parseInt(start)
                 if (pending < 1000) color = 'blue'
                 if (pending < 500) color = 'green'
            }


            // meta.innerHTML = `Status: <b>Active</b>, Remaining: ${pending}<b></b>`
            meta.innerHTML = `<em>Remaining: </em><b style="color: ${color};">${pending}<b></b>`
        }

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