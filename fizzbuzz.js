function fizzBuzz(x) {
    for (let i = 1; i < x; i++) {
        let output = ''
        if (i % 3 === 0 && i % 5 === 0) {
            output += 'fizzbuzz'
        } else if (i % 3 === 0) {
            output += 'fizz'
        } else if (i % 5 === 0) {
            output += 'buzz'
        } else {
            output = i
        }
        console.log(output)
    }
}

fizzBuzz(process.argv[2])