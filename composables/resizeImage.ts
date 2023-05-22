export function resizeImage(file: Blob, maxWidth: number, maxHeight: number) {
  return new Promise((resolve, reject) => {
    let image = new Image()
    image.src = URL.createObjectURL(file)
    image.onload = () => {
      let width = image.width,
        height = image.height

      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height *= maxWidth / width))
          width = maxWidth
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width *= maxHeight / height))
          height = maxHeight
        }
      }
      let canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      let ctx = canvas.getContext('2d')
      if (!ctx) {
        reject('Could not create canvas context')
        return
      }
      ctx.drawImage(image, 0, 0, width, height)
      canvas.toBlob(
        (blob) => {
          resolve(new File([blob as BlobPart], file.name, { type: 'image/png', lastModified: Date.now() }))
        },
        'image/png',
        1,
      )
    }
    image.onerror = reject
  })
}
