export function getProjectsForUser() {
    alert("LOL111")
    return fetch('http://localhost:5000/api/projects/user/60c7a4eb35e6652af83b85dc')
        .then(data => data.json())
}