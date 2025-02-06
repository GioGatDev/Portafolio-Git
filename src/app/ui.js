class UI {
    constructor() {
        this.profile = document.getElementById('perfil');
    }

    showProfile(user) {
        this.profile.innerHTML = `
        <div class="card mt-4 animated bounceInLeft rounded-lg" style="min-width: 300px; max-width: 400px; border-radius: 25px; overflow: hidden; -webkit-box-shadow: 10px 10px 42px -7px rgba(0,0,0,0.75); -moz-box-shadow: 10px 10px 42px -7px rgba(0,0,0,0.75); box-shadow: 10px 10px 42px -7px rgba(0,0,0,0.75); font-family: 'Kanit', sans-serif;">
        <img src="${user.avatar_url}" class="card-img-top" style="object-fit: cover;"/>
        <div class="card-body">
        <h3 class="card-title text-primary">
        ${user.name} / ${user.login}
        </h3>
        <a href="${user.html_url}" class="btn btn-primary btn-block" target="_black mx-auto" style="font-size: 18px; font-weight: 700;">
        Ver perfil
        </a>
        <span class="badge badge-pill badge-info d-block mt-3" style="font-size: 16px; padding: 8px; width: 100%; letter-spacing: 1px; font-weight: 600; white-space: normal;">
            Seguidores: ${user.followers}
        </span>
        <span class="badge badge-pill badge-info d-block mt-2" style="font-size: 16px; padding: 8px; width: 100%; letter-spacing: 1px; font-weight: 600; white-space: normal;">
            Siguiendo: ${user.following}
        </span>
        <span class="badge badge-pill badge-info d-block mt-2" style="font-size: 16px; padding: 8px; width: 100%; letter-spacing: 1px; font-weight: 600; white-space: normal;">
            Repositorios públicos: ${user.public_repos}
        </span>
        </div>
        </div>
    `;
        this.limpiarpantalla();
    }
    showRepositories(repositories) {
        let template = '';
        repositories.forEach(repo => {
            template += `
        <div class="card card-body mt-4 animated bounceInRight" style="font-family: 'Kanit', sans-serif;">
          <div class="row">
            <div class="col-md-6">
              <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            </div>
            <div class="col-md-6">
                <span class="badge badge-primary" style="font-weight: 600;">
                  Language: ${repo.language}
                </span>
                <span class="badge badge-success" style="font-weight: 600;">
                  Forks: ${repo.forks_count}
                </span>
            </div>
          </div>
        </div>
      `;
        })
        document.getElementById('repositorios').innerHTML = template;

    }
    showMessage(message, cssClass) {
        const div = document.createElement('div');
        div.className = cssClass;
        div.appendChild(document.createTextNode(message));
        const content = document.querySelector('.row');
        const profile = document.querySelector('#perfil');
        content.insertBefore(div, profile);
        setTimeout(() => this.limpiarpantalla(), 3000);
    }

    limpiarpantalla() {
        const alertFound = document.querySelector('.alert');
        if (alertFound) {
            alertFound.remove();
        }
    }
    reset() {
        this.profile.innerHTML = `
          <div class="container mt5">
            <h3 class="display-2 text-center">Gracias!</h3>
          </div>
        `
    }
}
module.exports = UI;