export async function fetchProjectsForUser(id) {
    let response = await fetch('http://localhost:4000/api/projects/user/' + id)
    let result = await response.json();
    console.log(result)
    return result.projects;
}

export async function fetchAllProjects() {
    let response = await fetch('http://localhost:4000/api/projects/')
    let result = await response.json();
    console.log(result)
    return result.projects;
}

export async function fetchProject(id) {
    let response = await fetch('http://localhost:4000/api/projects/'+ id)
    let result = await response.json();
    console.log(result)
    return result.project;
}

export async function fetchUserById(id) {
    let response = await fetch('http://localhost:4000/api/users/'+ id)
    let result = await response.json();
    console.log(result)
    return result.user;
}

export async function fetchReview(id) {
    let response = await fetch('http://localhost:4000/api/reviews/'+ id)
    let result = await response.json();
    console.log(result)
    return result.review;
}

export async function addReview(review) {
    let response = await fetch('http://localhost:4000/api/reviews', {
        headers: { 'Content-Type': 'application/json' },
        method : 'POST',
        body: JSON.stringify(review)
    })
    let result = await response.json();
    console.log(result)
    return result.review;
}

export async function editProject(project) {
    let response = await fetch('http://localhost:4000/api/projects/' + project.id , {
        headers: { 'Content-Type': 'application/json' },
        method : 'PATCH',
        body: JSON.stringify(project)
    })
    let result = await response.json();
    console.log(result)
    return result.review;
}

export async function editProjectMark(project) {
    let response = await fetch('http://localhost:4000/api/projects/mark/' + project.id , {
        headers: { 'Content-Type': 'application/json' },
        method : 'PATCH',
        body: JSON.stringify(project)
    })
    let result = await response.json();
    console.log(result)
    return result.review;
}

export async function editReview(review){
    let response = await fetch('http://localhost:4000/api/reviews/' + review.id , {
        headers: { 'Content-Type': 'application/json' },
        method : 'PATCH',
        body: JSON.stringify(review)
    })
    let result = await response.json();
    console.log(result)
    return result.review;
}

export async function loginUser(user) {
    let response = await fetch('http://localhost:4000/api/users/login',{
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(user)
    })

    let result = await response.json();
    console.log(result)
    return result.user;

}

export async function signUpUser(user) {
    let response = await fetch('http://localhost:4000/api/users/signup',{
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    })

    let result = await response.json();
    console.log(result)
    return result.user;

}

export async function updateUserImg(user) {

    let response = await fetch('http://localhost:4000/api/users/' + user.id,{
        headers: { 'Content-Type': 'application/json' },
        method: 'PATCH',
        body: JSON.stringify(user)
    })

    let result = await response.json();
    console.log(result)
    return result.user;

}

export async function addProject(project){
    let response = await fetch('http://localhost:4000/api/projects',{
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project)
    })

    let result = await response.json();
    console.log(result)
    return result.project;
}