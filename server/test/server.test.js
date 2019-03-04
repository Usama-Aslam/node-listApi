const request = require("supertest");
const expect = require("expect");

const { app } = require("../Server");
const { List } = require("../models/List");
// const { User } = require("../models/User");

beforeEach(done => {
  List.remove({}).then(() => done());
});

describe("POST /list", () => {
  it("should post list to the database", done => {
    var text = "first test list";

    request(app)
      .post("/lists")
      .send({ text })
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) return done(err);

        List.find({ text })
          .then(list => {
            expect(list.length).toBe(1);
            expect(list[0].text).toBe(text);
            done();
          })
          .catch(e => done(e));
      });
  });

  it("should return 404 when passed null", done => {
    request(app)
      .post("/lists")
      .send({})
      .expect(404)
      .end(done);
  });
});
