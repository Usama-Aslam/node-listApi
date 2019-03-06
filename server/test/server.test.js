const request = require("supertest");
const expect = require("expect");
const { ObjectID } = require("mongodb");

const { app } = require("../Server");
const { List } = require("../models/List");
// const { User } = require("../models/User");

const lists = [
  { text: "first test list", _id: new ObjectID() },
  { text: "second test list", _id: new ObjectID() }
];

beforeEach(done => {
  List.remove({})
    .then(() => List.insertMany(lists))
    .then(() => done());
});

describe("POST /list", () => {
  it("should post list to the database", done => {
    var text = "google test list";

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
            // expect(list.length).toBe(1);
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

describe("GET /lists", () => {
  it("should get all the docs from list", done => {
    var text = lists[0].text;
    request(app)
      .get("/lists")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        List.find()
          .then(list => {
            expect(list.length).toBe(2);
            done();
          })
          .catch(e => done(e));
      });
  });
});

describe("GET /lists/:id", () => {
  it("should get particular doc from lists", done => {
    var hexId = lists[0]._id.toHexString();

    request(app)
      .get(`/lists/${hexId}`)
      .expect(200)
      .expect(res => {
        // console.log(res.body.list);
        expect(res.body.list.text).toBe(lists[0].text);
      })
      .end(done);
  });

  it("should return 400 for invalid id", done => {
    request(app)
      .get("/lists/12354")
      .expect(400)
      .end(done);
  });

  it("should return 404 if no list found", done => {
    var hexId = new ObjectID().toHexString();
    request(app)
      .get(`/lists/${hexId}`)
      .expect(404)
      .expect(res => expect(res.body.error).toEqual("list not found"))
      .end(done);
  });
});
