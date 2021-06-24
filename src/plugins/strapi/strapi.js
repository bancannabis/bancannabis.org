export default ({ $strapi }) => {
    $strapi.hook('sendNotificationMail', (email) => {
      console.log("here")
      console.log(email)
    })
}