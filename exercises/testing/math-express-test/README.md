#### Math Express Test

<!-- describe("POST /sum", () => {
    test("should calculate sum of two numbers", async () => {
        const response = await request(app)
            .post("/sum")
            .send({ a: "5", b: "3" });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ result: 8 });
    });

    test("should return an error if a non-number is passed", async () => {
        const response = await request(app)
            .post("/sum")
            .send({ a: "five", b: "3" });
        expect(response.status).toBe(400);
        expect(response.text).toBe("Query parameter a is not a number");
    });

    test("should return an error if a parameter is missing", async () => {
        const response = await request(app)
            .post("/sum")
            .send({ a: "5" });
        expect(response.status).toBe(400);
        expect(response.text).toBe("Query parameter b is a mandatory field");
    });
});

describe("GET /sum", () => {
    test("should calculate sum of two numbers", async () => {
        const response = await request(app)
            .get("/sum")
            .query({ a: "5", b: "3" });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ result: 8 });
    });

    test("should return an error if a non-number is passed", async () => {
        const response = await request(app)
            .get("/sum")
            .query({ a: "five", b: "3" });
        expect(response.status).toBe(400);
        expect(response.text).toBe("Query parameter a is not a number");
    });

    test("should return an error if a parameter is missing", async () => {
        const response = await request(app)
            .get("/sum")
            .query({ a: "5" });
        expect(response.status).toBe(400);
        expect(response.text).toBe("Query parameter b is a mandatory field");
    });
}); -->

Download het [starter](./starter.zip) project. Dit project bevat een express applicatie die een GET en een POST van `/sum` endpoint voorziet. De GET endpoint verwacht twee query parameters `a` en `b` en geeft de som van deze twee getallen terug. De POST endpoint verwacht een JSON body met twee getallen `a` en `b` en geeft de som van deze twee getallen terug.

Schrijf de volgende tests aan de hand van `jest` en `supertest`:

- Test dat de POST/GET endpoint de som van twee getallen teruggeeft.
- Test dat de POST/GET endpoint een error geeft als een string wordt meegegeven. (bv "five")
- Test dat de POST/GET endpoint een error geeft als een parameter ontbreekt.


