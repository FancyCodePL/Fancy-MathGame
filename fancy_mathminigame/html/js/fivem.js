let first = 1
let symbol = '+'
let second = 2
let count = 1

function startProgressBar(element, duration, onComplete) {
    var progressBar = document.getElementById(element)
    var progress = 100
    var interval = 10
    var timer = setInterval(function() {
        if (progress <= 0) {
            clearInterval(timer)
            if (typeof onComplete === "function") {
                onComplete()
            }
        } else {
            progress -= (interval / duration) * 100
            $('.time').text((progress / 2).toFixed(1) + 's')

            if (progress < 0) {
                progress = 0
            }
            progressBar.style.width = progress + "%"
        }
    }, interval)
}

function GenerateNextMath(id) {
    if (id == 10){
        let audio = document.getElementById("success")
        audio.volume = 0.5
        audio.play()
        $('.main').fadeOut(500)
        $('.wygrales').fadeIn(500)
        startProgressBar("fill3", 5000, function () {
            $('.wygrales').fadeOut(500) 
            $('.hack-container').fadeOut(500)
            $.post(`https://${GetParentResourceName()}/success`)
        })
    } else {
        $('.math-count').text(count + '/10')

        let symbols = ["*", "+", "-"]
        let randomSymbol = symbols[Math.floor(Math.random() * symbols.length)]
    
        let randomNumber = Math.floor(Math.random() * 10) + 1
        let randomNumber2 = Math.floor(Math.random() * 10) + 1
    
        if (randomNumber > randomNumber2){
            first = randomNumber
            symbol = randomSymbol
            second = randomNumber2
        } else {
            first = randomNumber2
            symbol = randomSymbol
            second = randomNumber
        }
    
        $('.math').text(randomNumber + randomSymbol + randomNumber2)
    }
}

function StartHack() {
    count = 1

    $('.hack-container').fadeIn(500)
    $('.main').fadeIn(500)
    $('.math-count').text(count + '/10')

    let symbols = ["*", "+", "-"]
    let randomSymbol = symbols[Math.floor(Math.random() * symbols.length)]

    let randomNumber = Math.floor(Math.random() * 10) + 1
    let randomNumber2 = Math.floor(Math.random() * 10) + 1

    if (randomNumber > randomNumber2){
        first = randomNumber
        symbol = randomSymbol
        second = randomNumber2
    } else {
        first = randomNumber2
        symbol = randomSymbol
        second = randomNumber
    }

    $('.math').text(randomNumber + randomSymbol + randomNumber2)

    startProgressBar("fill", 50000, function () {
        $('.main').fadeOut(500)
        $('.przegrales').fadeIn(500)
        let audio = document.getElementById("failure")
        audio.volume = 0.5
        audio.play()
        startProgressBar("fill2", 5000, function () {
            $('.przegrales').fadeOut(500) 
            $('.hack-container').fadeOut(500)
            $.post(`https://${GetParentResourceName()}/failure`)
        })
    })    
}

window.addEventListener("message", function(event) {
    if (event.data.action == "StartMinigame") {
        StartHack()
    }
})

$('#input').keypress(function(event) {
    if (event.keyCode === 13) {
        event.preventDefault()
        let text = $(this).val()
        $(this).val("")

        let result = 0
        
        if (symbol == '+'){
            result = first + second
        } else if (symbol == "-"){
            result = first - second
        }else if (symbol == '*'){
            result = first * second
        }

        if (text == result){
            count = count + 1
            GenerateNextMath(count)
        } else {
            $('.main').fadeOut(500, () => {
                let audio = document.getElementById("failure")
                audio.volume = 0.5
                audio.play()
                $('.przegrales').fadeIn(500) 
                startProgressBar("fill2", 5000, function () {
                    $('.przegrales').fadeOut(500) 
                    $('.hack-container').fadeOut(500)

                    $.post(`https://${GetParentResourceName()}/failure`)
                })
            })
        }
    }
})