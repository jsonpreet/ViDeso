export function getCurrentDuration(duration) {
    const seconds = Math.round(duration)
    const second = (duration > 10) ? (seconds / 3) : (duration > 5) ? (seconds / 1.5) : (duration > 1) ? 1 : 0
    return Math.round(second);
}