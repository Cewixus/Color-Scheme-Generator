document.addEventListener("click", function(e){
    //get color scheme button 
    if(e.target.id === "get-button"){         
        getColorPalette()                    
    }

    //copying hex value and copied message appearance
    if(e.target.id === "color"){    
        navigator.clipboard.writeText(e.target.getAttribute("name"))
        document.getElementById("copied-message").style.display = 'block'
        setTimeout(function(){
            document.getElementById("copied-message").style.display = 'none'
        }, 1000)
    }
})

//copied message follows cursor
document.addEventListener('mousemove', function(e){     
    document.getElementById('copied-message').style.transform = 'translateY('+(e.clientY-70)+'px)';
    document.getElementById('copied-message').style.transform += 'translateX('+(e.clientX+20)+'px)';            
});

//get color scheme button function
function getColorPalette(){    
    const chosenScheme = document.getElementById("select-color").value
    const chosenHex = document.getElementById("color-input").value
    const chosenColor = chosenHex.replace("#", "")
    console.log(chosenColor, chosenScheme)
    fetch(`https://www.thecolorapi.com/scheme?hex=${chosenColor}&mode=${chosenScheme}`)
        .then(res => res.json())
        .then(data => renderColorPalette(data)) //fetching data from api
}

//render colors returned from colorapi
function renderColorPalette(data){ 
    const colorsArray = data.colors
    let html = ''
    for(const color of colorsArray){
        html += `
        <div class="hex-container">
        <div class="hex-container" style="background-color:${color.hex.value}" name="${color.hex.value}" id="color"></div>
        <p>${color.hex.value}</p>
        </div>
        `
    }
    document.getElementById("color-container").innerHTML = html
}