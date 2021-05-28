for (var i = 0; i < 10; i++) { 
    setTimeout(function() { 
        console.log(this)
    }.bind(i), 1000)
}