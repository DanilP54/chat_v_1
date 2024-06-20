function add(...args) {
    if (!args.length) return 0
    return function pass(...args2) {
        if (!args2.length) return args.reduce((acc, num) => acc + num, 0)
        return add.apply(this, args.concat(args2))
    }
}
console.log(add(2)(10)())
 








