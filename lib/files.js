// lib/files.js
export async function fileToBuffer(file) {
  const ab = await file.arrayBuffer()
  return Buffer.from(ab)
}
export function bufferToDataURI(buffer, mimetype) {
  return `data:${mimetype};base64,${buffer.toString("base64")}`
}
