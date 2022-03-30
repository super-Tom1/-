import request from "./request"



export async function getProjects() {
    return request.get("/api/project")
}