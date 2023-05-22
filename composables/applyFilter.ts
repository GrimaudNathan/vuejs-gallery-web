export function applyFilter(file: Blob, filter: string) {
  return new Promise((resolve, reject) => {
    let image = new Image()
    image.src = URL.createObjectURL(file)
    image.onload = () => {
      let canvas = document.createElement('canvas')
      canvas.width = image.width
      canvas.height = image.height
      let ctx = canvas.getContext('2d')
      if (!ctx) {
        reject('Could not create canvas context')
        return
      }
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

      let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      let data = imageData.data
      for (var i = 0; i < data.length; i += 4) {
        switch (filter) {
          case 'grayscale':
            let avg = (data[i] + data[i + 1] + data[i + 2]) / 3
            data[i] = avg // red
            data[i + 1] = avg // green
            data[i + 2] = avg // blue
            break
          case 'sepia':
            let r = data[i],
              g = data[i + 1],
              b = data[i + 2]
            data[i] = 0.393 * r + 0.769 * g + 0.189 * b
            data[i + 1] = 0.349 * r + 0.686 * g + 0.168 * b
            data[i + 2] = 0.272 * r + 0.534 * g + 0.131 * b
            break
        }
      }
      ctx.putImageData(imageData, 0, 0)

      canvas.toBlob(
        (blob) => {
          resolve(new File([blob as BlobPart], file.name, { type: 'image/jpeg', lastModified: Date.now() }))
        },
        'image/jpeg',
        1,
      )
    }
    image.onerror = reject
  })
}
