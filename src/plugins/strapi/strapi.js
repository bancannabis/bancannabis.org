export default ({ $strapi, app }) => {
    $strapi.hook('error', (error) => {
      app.$toast.error(error.message)
    })
}