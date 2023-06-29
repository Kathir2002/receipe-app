const homeScreen = () => {
    it("add favourites", async () => {
        await waitFor(element(by.id('homeScreenMainView'))).toBeVisible();
        // await waitFor(element(by.id("visibleIconView"))).toBeVisible()
        await waitFor(element(by.id("virtualist"))).toBeVisible()
        await expect(element(by.id("virtual-NjZ8Uy558H0"))).toBeVisible()
        // await waitFor(element(by.id('scrollPointView'))).toBeVisible();
        // await element(by.id("scrollPointView")).scroll(500, 'down')
        // await element(by.id("scrollPointView")).scroll(400, 'up')
    })
    xit("Home screen", async () => {
        await waitFor(element(by.id('appHeaderView'))).toBeVisible();
        await waitFor(element(by.id('homeScreenMainView'))).toBeVisible();
        await waitFor(element(by.id('voiceView'))).toBeVisible();
        await element(by.id("voiceIcon")).tap()
        await waitFor(element(by.id('scrollPointView'))).toBeVisible();
        await element(by.id("scrollPointView")).scroll(500, 'down')
        await element(by.id("scrollPointView")).scroll(400, 'up')
        await waitFor(element(by.id("virtualist"))).toBeVisible()

        // await element(by.id("virtualist")).scrollToIndex(0)
        await element(by.id("virtualist")).atIndex(0).tap()

    })
}

module.exports.homeScreen = homeScreen