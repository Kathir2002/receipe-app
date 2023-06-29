const signin = () => {
    xit("Signin screen failure case", async () => {
        await waitFor(element(by.id('signinMainView'))).toBeVisible()
        await (element(by.id("emailField"))).tap()
        await (element(by.id("emailField"))).typeText("kathirmathavan@gmail.com")
        await device.pressBack()
        await (element(by.id("passwordField"))).tap()
        await (element(by.id("icon"))).tap()
        await (element(by.id("passwordField"))).typeText("mathavan")
        await device.pressBack()
        await element(by.id("signinBtn")).tap()
    })
    it("Signin screen success case", async () => {
        await (element(by.id("emailField"))).tap()
        await (element(by.id("emailField"))).clearText()
        await (element(by.id("emailField"))).typeText("kathirmathavan17@gmail.com")
        await device.pressBack()
        await (element(by.id("passwordField"))).tap()
        await (element(by.id("passwordField"))).clearText()
        await (element(by.id("icon"))).tap()
        await (element(by.id("passwordField"))).typeText("mathavan")
        await device.pressBack()
        await element(by.id("signinBtn")).tap()
    })
}

module.exports.signin = signin