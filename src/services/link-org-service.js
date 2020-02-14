import wretch from "wretch";

export class LinkOrgService {
  linkOrgApi = wretch()
    .url(process.env.REACT_APP_API_URL)
    .options({ mode: "cors" });

  async fetchPosts() {
    return await this.linkOrgApi.url("/posts").get().json();
  }
  
  async sendPost(post) {
    return await this.linkOrgApi.url("/posts").post(post).json();
  }

  async fetchTags() {
    return await this.linkOrgApi.url("/tags").get().json();
  }

  async deletePost(postId) {
    await this.linkOrgApi.url(`/posts/${postId}`).delete();
  }
}
