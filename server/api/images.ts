export default defineEventHandler((event) => {
  const response = $fetch('http://localhost:3000/images')
  return response
})
