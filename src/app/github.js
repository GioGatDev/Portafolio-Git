class Github {

    constructor(clientId, clientSecret) {
        this.client_id = clientId;
        this.client_secret = clientSecret;
        this.repos_count = 8;
        this.repos_sort = 'created: asc';
        this.api_base = 'https://api.github.com/users';
    }

    async fetchUser(user) {
        try {
            const userDataRequest = await fetch(
                `${this.api_base}/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`
            );
            const repositoriesRequest = await fetch(
                `${this.api_base}/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`
            );

            if (!userDataRequest.ok || !repositoriesRequest.ok) {
                throw new Error('Error en la petición a la API');
            }

            const [userData, repositories] = await Promise.all([
                userDataRequest.json(),
                repositoriesRequest.json()
            ]);

            return {
                userData,
                repositories
            };
        } catch (error) {
            console.error('Error fetching data:', error);
            return {
                userData: { message: 'Not Found' },
                repositories: []
            };
        }
    }
}

module.exports = Github;