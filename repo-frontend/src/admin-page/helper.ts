export const convertToMegabytes = (fileSize: number) => {
    const megabytes = fileSize / (1024 * 1024);
    return parseFloat(megabytes.toFixed(2));// 1 MB = 1024 * 1024 bytes
}