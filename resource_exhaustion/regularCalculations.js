function isPrime(num) {
    if (num <= 1) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    const sqrt = Math.sqrt(num);
    for (let i = 3; i <= sqrt; i += 2) {
        if (num % i === 0) return false;
    }
    return true;
}

self.onmessage = function (e) {
    const duration = e.data; // in ms
    const start = Date.now();
    let current = 2;

    while (Date.now() - start < duration) {
        if (isPrime(current)) {
            console.log("Sending Primes to server: " + current)
        }
        current++;
    }

    self.postMessage("done");
    self.close();
};
