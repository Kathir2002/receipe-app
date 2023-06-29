const homeReceipeScreen = () => {
    it("home recipe Screen", async () => {
        await waitFor(element(by.id('homeMainView'))).toBeVisible().withTimeout(50000)
        await element(by.id("searchBar")).typeText("chicken")
        await device.pressBack()
        await element(by.id("virtualist")).atIndex(0).tap()
        await waitFor(element(by.id('container'))).toBeVisible()
        await device.pressBack()
        await element(by.id("loginArrowBtn")).tap()
    })
}

module.exports.homeReceipeScreen = homeReceipeScreen