export async function fetchProjectsForUser() {
    let response = await fetch('http://localhost:5000/api/projects/user/60c7a4eb35e6652af83b85dc', {
        headers: {
            'Access-Control-Allow-Origin' : 'origin-list',
            'Content-Type': 'application/json'
        },
    });
    let result = await response.json();
    console.log(result)
    return result;
}