
const { waitFor, device } = require('detox')
const homeReceipeScreen = require("./src/Screens/homeRecipeScreen")
const signin = require("./src/Screens/signin")
const loginreq = require("./src/Screens/loginreq")
const homeScreen = require("./src/Login Stack/homeScreen")
const receipeDetails = require("./src/Login Stack/receipeDetadils")

describe("Flavour finder app", () => {
  it('launch the app', async () => {
    await device.launchApp();
  })

  describe("home receipe screen", () => {
    homeReceipeScreen.homeReceipeScreen()
  })
  describe("loginreq screen", () => {
    loginreq.loginreq()
  })
  describe("signin screen", () => {
    signin.signin()
  })
  describe("home screen", () => {
    homeScreen.homeScreen()
  })
  xdescribe("receipeDetails screen", () => {
    receipeDetails.receipeDetails()
  })
})