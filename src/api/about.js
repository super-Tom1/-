import request from "./request";

export async function getAbout(){
    return request.get("/api/about")
}