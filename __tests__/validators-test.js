const validators = require('../validators/template');

describe("Validation Function", () => {
    test("It should pass", () => {
        expect(validators.Template('stelios', 'EMAIL', 'Hi')).toEqual(true)
    })
})