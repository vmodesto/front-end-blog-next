import { createServer, hasMany, Model } from "miragejs";

export function makeServer({ environmnet = "dvelopment"} = {}) {
    let server = createServer({
    environment: environmnet,

    models: {
      article: Model.extend({topics: hasMany()}),
      topic: Model.extend({articles: hasMany()}),
      course: Model,
      image: Model,
      content: Model,
    },

    seeds(server){
      server.create('article', {
      authorId: "1",
      authorImage: "https://smartgreen.net/wp-content/uploads/2021/01/person.jpg",
      authorName: "João",
      image: "https://miro.medium.com/max/1200/0*zVoTpIjc8BMOD7-i.png",
      title: "Desenvolvendo com react",
      description: "Nesse artigo dou uma breve introdução sobre como funciona o react",
      topics: [],
      date: "22/10/21"
      }),

      server.create('article', {
        authorId: "2",
        authorImage: "https://smartgreen.net/wp-content/uploads/2021/01/person.jpg",
        authorName: "João",
        image: "https://miro.medium.com/max/1200/0*zVoTpIjc8BMOD7-i.png",
        title: "Desenvolvendo com react",
        description: "Nesse artigo dou uma breve introdução sobre como funciona o react",
        topics: [],
        date: "22/10/21"
        }),
      server.create('course', {
        id: "1",
        name: "computação",
      })
      server.create('course', {
        id: "2",
        name: "matematica",
      })
      server.create('course', {
        id: "3",
        name: "física",
      })
      server.create('topic', {
        id: "1",
        name: "redes",
      })
      server.create('topic', {
        id: "2",
        name: "api",
      })
      server.create('topic', {
        id: "3",
        name: "operational system",
      })
    },

    routes() {
        this.namespace = "mock_api";

        this.get("/articles", (schema) => { return schema.articles.all();
        });
        this.get("/courses", (schema) => { return schema.courses.all();
        });
        this.get("/topics", (schema) => { return schema.topics.all();
        });

        this.post("/articles", (schema, request) => {
          let attrs = JSON.parse(request.requestBody);
          console.log(attrs)
          return schema.articles.create(attrs);
        })
        this.post("/images", (schema, request) => {
          console.log(request.requestBody)
          return schema.images.create(request.requestBody);
        })
        this.post("/content", (schema, request) => {
          console.log(request.requestBody)
          return schema.contents.create(request.requestBody);
        })

        this.post('users/login', () => {
          return {
            token: "fsdfsdfdsfdsfdsfsdf"
          }
        })
    }
})
    return server;
}