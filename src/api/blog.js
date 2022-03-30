import request from "./request";

/**
 * 获取博客列表数据
 */
export async function getBlogs(page = 1, limit = 10, categoryId = -1) {
  return await request.get("/api/blog", {
    params: {
      page,
      limit,
      categoryId,
    },
  });
}

/**
 * 获取博客分类
 */
export async function getBlogCategories() {
  return await request.get("/api/blogtype");
}

//通过ID获取博客，详情页
export async function getBlogById(id) {
  return await request.get('/api/blog/${id}')
}

//提交评论
export async function postComment(commitInfo) {
  return await request.post("/api/comment", commitInfo)
}

//通过博客ID获取评论
export async function getComments(blogId, page = 1, limit = 10) {
  return await request.get("/api/comment", {
    params: {
      blogId,
      page,
      limit
    }
  })
}