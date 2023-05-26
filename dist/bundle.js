(() => {
  var e = {
      898: (e) => {
        e.exports = class {
          constructor(e, t) {
            (this.client_id = e),
              (this.client_secret = t),
              (this.repos_count = 7),
              (this.repos_sort = "created: asc");
          }
          async fetchUser(e) {
            const t = await fetch(
                `http://api.github.com/users/${e}?client_id=${this.client_id}&client_secret=${this.client_secret}`
              ),
              s = await fetch(
                `http://api.github.com/users/${e}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`
              ),
              n = await s.json();
            return { userData: await t.json(), repositories: n };
          }
        };
      },
      451: (e) => {
        e.exports = class {
          constructor() {
            this.profile = document.getElementById("perfil");
          }
          showProfile(e) {
            (this.profile.innerHTML = `\n        <div class="card mt-4 animated bounceInLeft" style="width: 18rem;">\n        <img src="${e.avatar_url}" class="card-img-top"/>\n        <div class="card-body">\n        <h3 class="card-title">\n        ${e.name} / ${e.login}\n        </h3>\n        <a href="${e.html_url}" class="btn btn-primary btn-block" target="_black mx-auto">\n        Ver perfil\n        </a>\n        <span class="badge badge-pill badge-info">\n            Seguidores: ${e.followers}\n        </span>\n        <span class="badge badge-pill badge-primary">\n            Siguiendo: ${e.following}\n        </span>\n        <span class="badge badge-pill badge-dark d-block mt-2">\n            Repositorios públicos: ${e.public_repos}\n        </span>\n        </div>\n        </div>\n        \n        `),
              this.limpiarpantalla();
          }
          showRepositories(e) {
            let t = "";
            e.forEach((e) => {
              t += `\n        <div class="card card-body mt-4 animated bounceInUp">\n          <div class="row">\n            <div class="col-md-6">\n              <a href="${e.html_url}" target="_blank">${e.name}</a>\n            </div>\n            <div class="col-md-6">\n                <span class="badge badge-primary">\n                  Language: ${e.language}\n                </span>\n                <span class="badge badge-success">\n                  Forks: ${e.forks_count}\n                </span>\n            </div>\n          </div>\n        </div>\n      `;
            }),
              (document.getElementById("repositorios").innerHTML = t);
          }
          showMessage(e, t) {
            const s = document.createElement("div");
            (s.className = t), s.appendChild(document.createTextNode(e));
            const n = document.querySelector(".row"),
              a = document.querySelector("#perfil");
            n.insertBefore(s, a), setTimeout(() => this.limpiarpantalla(), 3e3);
          }
          limpiarpantalla() {
            const e = document.querySelector(".alert");
            e && e.remove();
          }
          reset() {
            this.profile.innerHTML =
              '\n          <div class="container mt5">\n            <h3 class="display-2 text-center">Gracias!</h3>\n          </div>\n        ';
          }
        };
      },
      986: (e) => {
        "use strict";
        e.exports = JSON.parse(
          '{"client_id":"2099f57d7d11f5b287a2","client_secret":"198b20d813de5119df3b067a65c2067560b97004"}'
        );
      },
    },
    t = {};
  function s(n) {
    var a = t[n];
    if (void 0 !== a) return a.exports;
    var r = (t[n] = { exports: {} });
    return e[n](r, r.exports, s), r.exports;
  }
  (() => {
    const e = s(451),
      t = s(898),
      { client_id: n, client_secret: a } = s(986),
      r = new t(n, a),
      i = new e();
    document.getElementById("userForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const t = document.getElementById("textSearch").value;
      "" !== t
        ? r.fetchUser(t).then((e) => {
            "Not Found" === e.userData.message
              ? i.showMessage(
                  "El Usuario no existe!",
                  "alert alert-danger col-md-12 mt-2"
                )
              : (i.showProfile(e.userData), i.showRepositories(e.repositories));
          })
        : i.reset();
    });
  })();
})();
