/** formatBytes formats a numeric value of bytes. */
export function formatBytes(bytes: number, numericScale: number = 2): string {
    if (bytes === 0) return "0 Bytes"

    const k = 1024
    const scale = numericScale < 0 ? 0 : numericScale
    const sizes = ["Bytes", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return parseFloat((bytes / Math.pow(k, i)).toFixed(scale)) + " " + sizes[i]
}
