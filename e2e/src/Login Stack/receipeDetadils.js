const receipeDetails = () => {
    it("receipe details screen", async () => {
        await waitFor(element(by.id("receipeDetailsMainView"))).toBeVisible()
        await waitFor(element(by.id("rDScrollView"))).toBeVisible()
        await element(by.id("rDScrollView")).scroll(400, 'down')
        await element(by.id("rDScrollView")).scroll(400, 'up')
        await element(by.id("backIcon")).tap()
    })
}

module.exports.receipeDetails = receipeDetails