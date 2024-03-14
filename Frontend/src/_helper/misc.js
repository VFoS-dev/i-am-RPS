export function fn() { }

export function clickOff(variable, set = false) {
    function flipValueOff() {
        if (variable.value) {
            variable.value = set;
        }
    }

    setTimeout(() => {
        window.addEventListener('click', flipValueOff, { once: true })
    }, 0)
}