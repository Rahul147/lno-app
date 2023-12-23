export function getWeekOfYear(date, display = false) {
    const target = new Date(date.valueOf())
    const dayNr = (date.getDay() + 6) % 7
    target.setDate(target.getDate() - dayNr + 3)

    // Start of ISO week year is the first Thursday
    const firstThursday = target.valueOf()
    target.setMonth(0, 1)
    if (target.getDay() !== 4) {
        target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7)
    }

    return (display ? 0 : (target.getFullYear() * 100 + 1)) + Math.ceil((firstThursday - target) / (604800000))
}
