import { randomInt } from "crypto";
import { createServer, Model } from "miragejs";

export function makeServer({ environmnet = "dvelopment"} = {}) {
    let server = createServer({
    environment: environmnet,

    models: {
      article: Model,
      topic: Model,
      course: Model,
    },

    seeds(server){
      server.create('article', {
      authorId: "1",
      authorImage: "https://smartgreen.net/wp-content/uploads/2021/01/person.jpg",
      authorName: "João",
      image: "https://miro.medium.com/max/1200/0*zVoTpIjc8BMOD7-i.png",
      title: "Desenvolvendo com react",
      description: "Nesse artigo dou uma breve introdução sobre como funciona o react",
      topics: ["computação", "matematica"],
      date: "22/10/21"
      }),

      server.create('article', {
        authorId: "2",
        authorImage: "https://smartgreen.net/wp-content/uploads/2021/01/person.jpg",
        authorName: "João",
        image: "https://miro.medium.com/max/1200/0*zVoTpIjc8BMOD7-i.png",
        title: "Desenvolvendo com react",
        description: "Nesse artigo dou uma breve introdução sobre como funciona o react",
        topics: ["computação", "matematica"],
        date: "22/10/21"
        }),
      server.create('topic', {
        name: "redes",
      })
      server.create('topic', {
        name: "operational system",
      })
      server.create('topic', {
        name: "api",
      })
      server.create('course', {
        name: "computação",
      })
      server.create('course', {
        name: "matematica",
      })
      server.create('course', {
        name: "física",
      })
    },

    routes() {
        this.namespace = "api";

        this.get("/articles", (schema) => { return schema.articles.all();
        });
        this.get("/courses", (schema) => { return schema.courses.all();
        });
        this.get("/topics", (schema) => { return schema.topics.all();
        });


        this.post('users/login', () => {
          return {
            token: "fsdfsdfdsfdsfdsfsdf"
          }
        })
    }
})
    return server;
}