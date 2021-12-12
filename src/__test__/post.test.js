const app = require("../app");
const request = require("supertest");
const User = require("../models/user");
const Post = require("../models/post");

afterEach(async () => {
  await Post.deleteMany();
  await User.deleteMany();
});

describe("posts", () => {
  it("return status code 404, when dont find any data", async () => {
    const res = await request(app).get("/posts");

    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toBe("Could not find posts");
  });

  it("return status code 404, when dont find any single post data", async () => {
    const res = await request(app).get("/posts/507c7f79bcf86cd7994f6c0e");

    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toBe("Could not find post");
  });

  it("return single post", async () => {
    const user = await User.create({
      email: "test@test.pl",
      encryptedPassword: "Test123123!",
      role: "restricted",
      editingPermissions: {
        postsMustBeApprovedByAdmin: false,
      },
    });
    const post = await Post.create({
      title: "Test post",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae dictum augue. Nullam quis ullamcorper nibh.",
      preview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      author: user._id,
      show: true,
    });

    const res = await request(app).get("/posts/" + post._id);

    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toBe(post.title);
    expect(res.body.content).toBe(post.content);
    expect(res.body.author).toBe(post.author.toString());
    expect(res.body.show).toBe(post.show);
    expect(res.body.readingTime).toBeDefined();
  });

  it("return all posts", async () => {
    const user = await User.create({
      email: "test@test.pl",
      encryptedPassword: "Test123123!",
      role: "restricted",
      editingPermissions: {
        postsMustBeApprovedByAdmin: false,
      },
    });

    const post1 = await Post.create({
      title: "Test post 1",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae dictum augue. Nullam quis ullamcorper nibh.",
      preview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      author: user._id,
      show: true,
    });

    const post2 = await Post.create({
      title: "Test post 2",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae dictum augue. Nullam quis ullamcorper nibh.",
      preview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      author: user._id,
      show: true,
    });

    const res = await request(app).get("/posts");

    expect(res.statusCode).toEqual(200);
    expect(res.body.documentsAmount).toEqual(2);

    expect(res.body.results[0].title).toBe(post2.title);
    expect(res.body.results[0].content).toBe(post2.content);
    expect(res.body.results[0].preview).toBe(post2.preview);
    expect(res.body.results[0].author).toBe(post2.author.toString());
    expect(res.body.results[0].show).toBe(post2.show);

    expect(res.body.results[1].title).toBe(post1.title);
    expect(res.body.results[1].content).toBe(post1.content);
    expect(res.body.results[1].preview).toBe(post1.preview);
    expect(res.body.results[1].author).toBe(post1.author.toString());
    expect(res.body.results[1].show).toBe(post1.show);
  });
});
