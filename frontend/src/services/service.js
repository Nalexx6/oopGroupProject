export async function fetchProjectsForUser() {
    let response = await fetch('http://localhost:5000/api/projects/user/60c7a4eb35e6652af83b85dc')
    let result = await response.json();
    console.log(result)
    return result.projects;
}

export async function fetchAllProjects() {
    let response = await fetch('http://localhost:5000/api/projects/')
    let result = await response.json();
    console.log(result)
    return result.projects;
}

export async function fetchProject(id) {
    let response = await fetch('http://localhost:5000/api/projects/'+ id)
    let result = await response.json();
    console.log(result)
    return result.project;
}

export async function fetchUser(id) {
    let response = await fetch('http://localhost:5000/api/users/'+ id)
    let result = await response.json();
    console.log(result)
    return result.user;
}

export async function fetchReview(id) {
    let response = await fetch('http://localhost:5000/api/reviews/'+ id)
    let result = await response.json();
    console.log(result)
    return result.review;
}

export async function addReview(review) {
    let response = await fetch('http://localhost:5000/api/reviews', {
        headers: { 'Content-Type': 'application/json' },
        method : 'POST',
        body: JSON.stringify(review)
    })
    let result = await response.json();
    console.log(result)
    return result.review;
}

export async function editProject(project) {
    let response = await fetch('http://localhost:5000/api/projects/' + project.id , {
        headers: { 'Content-Type': 'application/json' },
        method : 'PATCH',
        body: JSON.stringify(project)
    })
    let result = await response.json();
    console.log(result)
    return result.review;
}