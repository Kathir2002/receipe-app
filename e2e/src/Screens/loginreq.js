const loginreq = () => {
    it("login req screen", async () => {
        await waitFor(element(by.id("container"))).toBeVisible()
        await element(by.id("loginBtn")).tap()
    })
}

module.exports.loginreq = loginreq