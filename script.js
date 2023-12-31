
const dropDown = document.querySelectorAll(".dropdown select")
const btn = document.querySelector(".getEx")
const fromCurr=document.querySelector(".from select")
const toCurr=document.querySelector(".to select")

for (let select of dropDown) {
    for (code in countryList) {
        let newOption = document.createElement("option")
        newOption.innerText = code
        newOption.value = code
        if (select.name === "from" && code === "USD") {
            newOption.selected = "selected"
        }
        else if (select.name === "to" && code === "INR") {
            newOption.selected = "selected"
        }
        select.append(newOption)
    }
    select.addEventListener("change", (evt) => {
        updateflag(evt.target)
    })
}
const updateflag = (element) => {
    let code = element.value
    let currCode = countryList[code]
    let newSrc = `https://flagsapi.com/${currCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newSrc
}
const updateCurrency= async ()=>{
    let amount=document.querySelector("form input")
    if(amount.value==="" || amount.value<1){
        amount.value=1
    }
    console.log(amount.value)
    const url=`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
    let response= await fetch(url)
    let data = await response.json()
    console.log(data[toCurr.value.toLowerCase()])
    let msg=document.querySelector(".message")
    msg.innerText=`${amount.value} ${fromCurr.value} = ${amount.value*data[toCurr.value.toLowerCase()]} ${toCurr.value}`
}
window.addEventListener("load",()=>{
    updateCurrency();
})
btn.addEventListener("click", async (evt) => {
    evt.preventDefault()
    updateCurrency();
})